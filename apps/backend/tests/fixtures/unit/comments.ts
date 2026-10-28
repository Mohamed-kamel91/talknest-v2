import { Comment, CreateCommentProps } from '../../../src/modules/comments/domain/comment';
import { CreateCommentInputBuilder } from '../../builders/create-comment-input-builder';
import { InMemoryCommentsRepository } from '../../../src/modules/comments/infra/repos';
import { CommentBody } from '../../../src/modules/comments/domain/comment-body';
import { InMemoryCommentVotesRepository } from '../../../src/modules/votes/infra/repos';
import { setupCommentVote } from './votes';

export function buildComment(overrides: Partial<CreateCommentProps> = {}) {
  const input = new CreateCommentInputBuilder().build();

  return Comment.create({
    ...input,
    body: CommentBody.create(input.body).getValue(),
    ...overrides,
  });
}

export function setupComment(
  inMemoryCommentsRepository: InMemoryCommentsRepository,
  overrides: Partial<CreateCommentProps> = {},
) {
  const existingComment = buildComment(overrides);

  inMemoryCommentsRepository.seed([existingComment]);

  return existingComment;
}

export function setupCommentWithInitialUpvote(
  commentsRepository: InMemoryCommentsRepository,
  commentVotesRepository: InMemoryCommentVotesRepository,
  overrides: Partial<CreateCommentProps> = {},
) {
  const existingComment = setupComment(commentsRepository, { ...overrides });
  const authorVote = setupCommentVote(commentVotesRepository, {
    memberId: existingComment.memberId,
    commentId: existingComment.id,
    voteType: 'upvote',
  });

  return { existingComment, authorVote };
}
