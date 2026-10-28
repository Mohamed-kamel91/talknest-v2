import { InMemoryEventBus } from '@talknest/bus';
import { VoteOnCommentCommand } from '@talknest/api/votes';

import { InMemoryMembersRepository } from '../../../../members/infra/repos';
import { InMemoryCommentsRepository } from '../../../../comments/infra/repos';
import { InMemoryCommentVotesRepository } from '../../../infra/repos';

import { setupLevel1Member } from '../../../../../../tests/fixtures/unit/members';
import {
  setupComment,
  setupCommentWithInitialUpvote,
} from '../../../../../../tests/fixtures/unit/comments';
import { aCommentVote } from '../../../../../../tests/builders/vote-input-builder';

import { VoteOnCommentUseCase } from './vote-on-comment';
import { CommentVote } from '../../../domain/comment-vote';
import { InsufficientMemberLevelError } from '../../../../members/domain/errors/member-errors';
import { CommentDownvoted } from '../../../domain/events/comment-downvoted';
import { CommentUnvoted } from '../../../domain/events/comment-unvoted';

describe('voteOnComment', () => {
  let membersRepositorySpy: InMemoryMembersRepository;
  let commentsRepositorySpy: InMemoryCommentsRepository;
  let commentVotesRepositorySpy: InMemoryCommentVotesRepository;
  let eventBus: InMemoryEventBus;
  let voteOnCommentUseCase: VoteOnCommentUseCase;
  let publishEventsSpy: jest.SpyInstance;

  beforeEach(() => {
    membersRepositorySpy = new InMemoryMembersRepository();
    commentVotesRepositorySpy = new InMemoryCommentVotesRepository();
    commentsRepositorySpy = new InMemoryCommentsRepository();
    eventBus = new InMemoryEventBus();

    publishEventsSpy = jest.spyOn(eventBus, 'publishEvents');

    voteOnCommentUseCase = new VoteOnCommentUseCase(
      membersRepositorySpy,
      commentsRepositorySpy,
      commentVotesRepositorySpy,
      eventBus,
    );
  });

  it('should not allow level 1 members to cast votes on comments other than their own', async () => {
    const level1Member = setupLevel1Member(membersRepositorySpy);
    const existingComment = setupComment(commentsRepositorySpy);

    const input = aCommentVote()
      .withMemberId(level1Member.id)
      .withCommentId(existingComment.id)
      .asUpvote()
      .build();

    const command = VoteOnCommentCommand.create(input);
    expect(command.isSuccess).toBe(true);

    const result = await voteOnCommentUseCase.execute(command.getValue());

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toBeInstanceOf(InsufficientMemberLevelError);

    expect(commentVotesRepositorySpy.getTimesMethodCalled('save')).toBe(0);
    expect(publishEventsSpy).toHaveBeenCalledTimes(0);
  });

  describe('authors voting on their own comment', () => {
    it('should unvote the author upvote when the author upvotes again', async () => {
      const expectedScoreChange = -1;

      const author = setupLevel1Member(membersRepositorySpy);
      const { existingComment, authorVote } = setupCommentWithInitialUpvote(
        commentsRepositorySpy,
        commentVotesRepositorySpy,
        { memberId: author.id },
      );

      const input = aCommentVote()
        .withMemberId(author.id)
        .withCommentId(existingComment.id)
        .asUpvote()
        .build();

      const command = VoteOnCommentCommand.create(input);
      expect(command.isSuccess).toBe(true);

      const result = await voteOnCommentUseCase.execute(command.getValue());
      expect(result.isSuccess).toBe(true);

      const commentVote = result.getValue();
      expect(commentVote).toBeInstanceOf(CommentVote);

      expect(commentVotesRepositorySpy.getTimesMethodCalled('save')).toBe(1);
      expect(commentVotesRepositorySpy.getMethodCallArgs('save')[0]).toBe(commentVote);

      expect(publishEventsSpy).toHaveBeenCalledTimes(1);
      const [publishedEvents] = publishEventsSpy.mock.calls[0];
      expect(publishedEvents).toHaveLength(1);

      const event = publishedEvents[0] as CommentUnvoted;
      expect(event).toBeInstanceOf(CommentUnvoted);
      expect(event.data.voteId).toBe(authorVote.id);
      expect(event.data.commentId).toBe(existingComment.id);
      expect(event.data.memberId).toBe(author.id);
      expect(event.data.scoreChange).toBe(expectedScoreChange);
    });

    it('should switch the author upvote to a downvote with a score change of -2', async () => {
      const expectedScoreChange = -2;

      const author = setupLevel1Member(membersRepositorySpy);
      const { existingComment, authorVote } = setupCommentWithInitialUpvote(
        commentsRepositorySpy,
        commentVotesRepositorySpy,
        { memberId: author.id },
      );

      const input = aCommentVote()
        .withMemberId(author.id)
        .withCommentId(existingComment.id)
        .asDownvote()
        .build();

      const command = VoteOnCommentCommand.create(input);
      expect(command.isSuccess).toBe(true);

      const result = await voteOnCommentUseCase.execute(command.getValue());
      expect(result.isSuccess).toBe(true);

      const commentVote = result.getValue();
      expect(commentVote).toBeInstanceOf(CommentVote);

      expect(commentVotesRepositorySpy.getTimesMethodCalled('save')).toBe(1);
      expect(commentVotesRepositorySpy.getMethodCallArgs('save')[0]).toBe(commentVote);

      expect(publishEventsSpy).toHaveBeenCalledTimes(1);
      const [publishedEvents] = publishEventsSpy.mock.calls[0];
      expect(publishedEvents).toHaveLength(1);

      const event = publishedEvents[0] as CommentDownvoted;
      expect(event).toBeInstanceOf(CommentDownvoted);
      expect(event.data.voteId).toBe(authorVote.id);
      expect(event.data.commentId).toBe(existingComment.id);
      expect(event.data.memberId).toBe(author.id);
      expect(event.data.scoreChange).toBe(expectedScoreChange);
    });
  });
});
