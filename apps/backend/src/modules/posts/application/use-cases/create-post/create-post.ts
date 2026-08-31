import { Result, UseCase } from '@talknest/core';
import { CreatePostCommand } from '@talknest/api/posts';
import { EventBus } from '@talknest/bus';

import { CanCreatePostPolicy } from './can-create-post';
import { Post } from '../../../domain/post';
import { IPostsRepository } from '../../../repos/ports/posts-repository';
import { IMembersRepository } from '../../../../members/repos/ports/members-repository';
import { PostCreationError } from '../../../posts-errors';

export type CreatePostResponse = Result<Post, PostCreationError>;

export class CreatePost implements UseCase<
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
