import { Result, IUseCase } from '@talknest/core';
import { CreatePostCommand } from '@talknest/api/posts';
import { EventBus } from '@talknest/bus';

import type { IMembersRepository } from '../../../../members/application/ports/members-repository';

import type { IPostsRepository } from '../../ports/posts-repository';
import { CanCreatePostPolicy } from '../../../domain/policies/can-create-post';
import { Post } from '../../../domain/post';
import { PostCreationError } from '../../../domain/errors/posts-errors';

export type CreatePostResponse = Result<Post, PostCreationError>;

export class CreatePostUseCase implements IUseCase<
  CreatePostCommand,
  CreatePostResponse
> {
  constructor(
    private postsRepository: IPostsRepository,
    private membersRepository: IMembersRepository,
    private eventBus: EventBus,
  ) {}

  async execute(
    request: CreatePostCommand,
  ): Promise<CreatePostResponse> {
    // Implement!
    throw new Error('To be implemented');
  }
}
