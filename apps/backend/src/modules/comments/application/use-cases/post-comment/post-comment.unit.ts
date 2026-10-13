import {
  InvalidRequestInputError,
  commentErrorCodes,
  memberErrorCodes,
  postErrorCodes,
  requestErrorCodes,
} from '@talknest/errors';
import { InMemoryEventBus } from '@talknest/bus';
import { PostCommentCommand } from '@talknest/api/comments';

import {
  buildLevel1Member,
  setupLevel1Member,
} from '../../../../../../tests/fixtures/unit/members';
import { buildPost, setupPostByRandomMember } from '../../../../../../tests/fixtures/unit/posts';
import { CreateCommentInputBuilder } from '../../../../../../tests/builders/create-comment-input-builder';

import { InMemoryMembersRepository } from '../../../../members/infra/repo/in-memory-members-repository';
import { InMemoryPostsRepository } from '../../../../posts/infra/repos/in-memory-posts-repository';
import { InMemoryCommentsRepository } from '../../../infra/repos/in-memory-comments-repository';

import { PostNotFoundError } from '../../../../posts/domain/errors/posts-errors';
import { MemberNotFoundError } from '../../../../members/domain/errors/member-errors';

import { PostCommentUseCase } from './post-comment';
import { CommentBodyTooLongError } from '../../../domain/errors/comment-errors';
import { CommentPosted } from '../../../domain/events/comment-posted';
import { CommentBody } from '../../../domain/comment-body';
import { Comment } from '../../../domain/comment';

describe('postComment', () => {
  let eventBus: InMemoryEventBus;
  let membersRepositorySpy: InMemoryMembersRepository;
  let postsRepositorySpy: InMemoryPostsRepository;
  let commentsRepositorySpy: InMemoryCommentsRepository;
  let postCommentUseCase: PostCommentUseCase;
  let publishEventsSpy: jest.SpyInstance;

  beforeEach(() => {
    membersRepositorySpy = new InMemoryMembersRepository();
    postsRepositorySpy = new InMemoryPostsRepository();
    commentsRepositorySpy = new InMemoryCommentsRepository();
    eventBus = new InMemoryEventBus();

    publishEventsSpy = jest.spyOn(eventBus, 'publishEvents');

    postCommentUseCase = new PostCommentUseCase(
      commentsRepositorySpy,
      postsRepositorySpy,
      membersRepositorySpy,
      eventBus,
    );
  });

  describe('permissions & identity', () => {
    it('should create comment as a level 1 member', async () => {
      const level1Member = setupLevel1Member(membersRepositorySpy);
      const existingPost = setupPostByRandomMember(postsRepositorySpy);

      const input = new CreateCommentInputBuilder()
        .withMemberId(level1Member.id)
        .withPostId(existingPost.id)
        .build();

      const command = PostCommentCommand.create(input);
      expect(command.isSuccess).toBe(true);

      const result = await postCommentUseCase.execute(command.getValue());

      expect(result.isSuccess).toBe(true);
      const comment = result.getValue();
      expect(comment).toBeInstanceOf(Comment);

      expect(commentsRepositorySpy.getTimesMethodCalled('save')).toBe(1);
      expect(commentsRepositorySpy.getCalls()[0]?.args[0]).toBe(comment);

      expect(publishEventsSpy).toHaveBeenCalledTimes(1);
      const [publishedEvents] = publishEventsSpy.mock.calls[0];
      expect(publishedEvents).toHaveLength(1);

      const event = publishedEvents[0] as CommentPosted;
      expect(event).toBeInstanceOf(CommentPosted);
      expect(event.commentId).toBe(comment.id);
      expect(event.postId).toBe(existingPost.id);
      expect(event.memberId).toBe(level1Member.id);
    });
  });

  describe('posting comments', () => {
    it('should not create comment, if the member does not exist', async () => {
      const nonExistentMember = buildLevel1Member();
      const existingPost = setupPostByRandomMember(postsRepositorySpy);

      const input = new CreateCommentInputBuilder()
        .withMemberId(nonExistentMember.id)
        .withPostId(existingPost.id)
        .build();

      const command = PostCommentCommand.create(input);
      expect(command.isSuccess).toBe(true);

      const result = await postCommentUseCase.execute(command.getValue());
      expect(result.isSuccess).toBe(false);
      expect(result.getError()).toBeInstanceOf(MemberNotFoundError);
      expect(result.getError().code).toBe(memberErrorCodes.MEMBER_NOT_FOUND);

      expect(commentsRepositorySpy.wasMethodCalled('save')).toBe(false);
      expect(publishEventsSpy).not.toHaveBeenCalled();
    });

    it('should not create comment, if the post does not exist', async () => {
      const level1Member = setupLevel1Member(membersRepositorySpy);
      const nonExistentPost = buildPost();

      const input = new CreateCommentInputBuilder()
        .withMemberId(level1Member.id)
        .withPostId(nonExistentPost.id)
        .build();

      const command = PostCommentCommand.create(input);
      expect(command.isSuccess).toBe(true);

      const result = await postCommentUseCase.execute(command.getValue());
      expect(result.isSuccess).toBe(false);
      expect(result.getError()).toBeInstanceOf(PostNotFoundError);
      expect(result.getError().code).toBe(postErrorCodes.POST_NOT_FOUND);

      expect(commentsRepositorySpy.wasMethodCalled('save')).toBe(false);
      expect(publishEventsSpy).not.toHaveBeenCalled();
    });
  });

  describe('comment validation', () => {
    it('should not create a comment if the body is empty', async () => {
      const level1Member = setupLevel1Member(membersRepositorySpy);
      const existingPost = setupPostByRandomMember(postsRepositorySpy);

      const input = new CreateCommentInputBuilder()
        .withMemberId(level1Member.id)
        .withPostId(existingPost.id)
        .withBody('')
        .build();

      const command = PostCommentCommand.create(input);

      expect(command.isSuccess).toBe(false);
      expect(command.getError()).toBeInstanceOf(InvalidRequestInputError);
      expect(command.getError().code).toBe(requestErrorCodes.INVALID_REQUEST_INPUT);

      expect(commentsRepositorySpy.wasMethodCalled('save')).toBe(false);
      expect(publishEventsSpy).not.toHaveBeenCalled();
    });

    it('should not create comment if body is exceeding 1000 characters', async () => {
      const level1Member = setupLevel1Member(membersRepositorySpy);
      const existingPost = setupPostByRandomMember(postsRepositorySpy);

      const input = new CreateCommentInputBuilder()
        .withMemberId(level1Member.id)
        .withPostId(existingPost.id)
        .withBody('a'.repeat(CommentBody.MAX_LENGTH + 1))
        .build();

      const command = PostCommentCommand.create(input);
      expect(command.isSuccess).toBe(true);

      const result = await postCommentUseCase.execute(command.getValue());
      expect(result.isSuccess).toBe(false);
      expect(result.getError()).toBeInstanceOf(CommentBodyTooLongError);
      expect(result.getError().code).toBe(commentErrorCodes.COMMENT_BODY_TOO_LONG);

      expect(commentsRepositorySpy.wasMethodCalled('save')).toBe(false);
      expect(publishEventsSpy).not.toHaveBeenCalled();
    });
  });
});
