import { Result, type IUseCase } from '@talknest/core';
import { NotFoundError } from '@talknest/errors/application';
import { PostCommentCommand } from '@talknest/api/comments';
import { EventBus } from '@talknest/bus';

import type { IMembersRepository } from '../../../../members/application/ports/members-repository';
import type { IPostsRepository } from '../../../../posts/application/ports/posts-repository';

import type { ICommentRepository } from '../../ports/comment-repository';
import { CanPostCommentPolicy } from '../../../domain/policies/can-post-comment';
import { Comment } from '../../../domain/comment';

export type PostCommentError = NotFoundError;
export type PostCommentResponse = Result<Comment, PostCommentError>;

export class PostCommentUseCase implements IUseCase<
  PostCommentCommand,
  PostCommentResponse
> {
  constructor(
    private commentRepo: ICommentRepository,
    private postRepository: IPostsRepository,
    private memberRepository: IMembersRepository,
    private eventBus: EventBus,
  ) {}

  async execute(
    command: PostCommentCommand,
  ): Promise<PostCommentResponse> {
    // Implement
    throw new Error('Not yet implemented');
  }
}
