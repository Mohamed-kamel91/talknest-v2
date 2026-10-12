import { success, type Result, type IUseCase } from '@talknest/core';
import { PostCommentCommand } from '@talknest/api/comments';
import { type IEventBus } from '@talknest/bus';

import type { IMembersRepository } from '../../../../members/application/ports/members-repository';
import type { IPostsRepository } from '../../../../posts/application/ports/posts-repository';
import {
  InsufficientMemberLevelError,
  MemberNotFoundError,
} from '../../../../members/domain/errors/member-errors';
import { PostNotFoundError } from '../../../../posts/domain/errors/posts-errors';

import type { ICommentsRepository } from '../../ports/comments-repository';
import { CanPostCommentPolicy } from '../../../domain/policies/can-post-comment';
import { CommentBodyValidationError } from '../../../domain/errors/comment-errors';
import { CommentBody } from '../../../domain/comment-body';
import { Comment } from '../../../domain/comment';

export type PostCommentError =
  | PostNotFoundError
  | MemberNotFoundError
  | CommentBodyValidationError
  | InsufficientMemberLevelError;
export type PostCommentResponse = Result<Comment, PostCommentError>;

export class PostCommentUseCase implements IUseCase<
  PostCommentCommand,
  PostCommentResponse
> {
  constructor(
    private commentsRepository: ICommentsRepository,
    private postsRepository: IPostsRepository,
    private membersRepository: IMembersRepository,
    private eventBus: IEventBus,
  ) {}

  async execute(
    command: PostCommentCommand,
  ): Promise<PostCommentResponse> {
    const { memberId, postId, body, parentCommentId } = command.props;

    const member = await this.membersRepository.getById(memberId);
    if (!member) {
      return fail(new MemberNotFoundError());
    }

    if (CanPostCommentPolicy.isAllowed(member)) {
      return fail(
        new InsufficientMemberLevelError(
          'You must be at least member level 1 to post a comment',
        ),
      );
    }

    const post = await this.postsRepository.getById(postId);
    if (!post) {
      return fail(new PostNotFoundError());
    }

    const commentBodyorError = CommentBody.create(body);
    if (commentBodyorError.isFailure) {
      return fail(commentBodyorError.getError());
    }

    const comment = Comment.create({
      memberId,
      postId,
      parentCommentId,
      body: commentBodyorError.getValue(),
    });

    await this.commentsRepository.save(comment);

    this.eventBus.publishEvents(comment.getDomainEvents());

    return success(comment);
  }
}
