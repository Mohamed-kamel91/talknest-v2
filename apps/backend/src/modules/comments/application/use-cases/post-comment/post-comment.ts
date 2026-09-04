import { Result, UseCase, success, fail } from '@talknest/core';
import { NotFoundError } from '@talknest/errors/application';
import { PostCommentCommand } from '@talknest/api/comments';
import { EventBus } from '@talknest/bus';

import { CanPostCommentPolicy } from '../../../domain/policies/can-post-comment';
import { Comment } from '../../../domain/entities/comment';
import { ICommentRepository } from '../../ports/comment-repository';
import { IPostsRepository } from '../../../../posts/application/posts-repository';
import { IMembersRepository } from '../../../../members/application/ports/members-repository';

export type PostCommentError = NotFoundError;

export class PostCommentUseCase implements UseCase<
  PostCommentCommand,
  Result<Comment, PostCommentError>
> {
  constructor(
    private commentRepo: ICommentRepository,
    private postRepository: IPostsRepository,
    private memberRepository: IMembersRepository,
    private eventBus: EventBus,
  ) {}

  async execute(
    command: PostCommentCommand,
  ): Promise<Result<Comment, PostCommentError>> {
    // Implement
    throw new Error('Not yet implemented');
  }
}
