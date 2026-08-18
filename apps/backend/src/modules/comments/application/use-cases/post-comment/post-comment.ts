import { Result, UseCase, success, fail } from '@talknest/core';
import { NotFoundError } from '@talknest/errors/application';
import { PostCommentCommand } from '@talknest/api/comments';
import { EventBus } from '@talknest/bus';

import { CanPostCommentPolicy } from './can-post-comment';
import { Comment } from '../../../domain/comment';
import { ICommentRepository } from '../../../repos/ports/comment-repository';
import { IPostsRepository } from '../../../../posts/repos/ports/posts-repository';
import { IMembersRepository } from '../../../../members/repos/ports/members-repository';

export type PostCommentError = NotFoundError;

export class PostComment implements UseCase<
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
