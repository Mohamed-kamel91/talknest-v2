import {
  CreatePostCommand,
  GetPostByIdQuery,
  GetPostsQuery,
} from '@talknest/api/posts';
import { type IEventBus } from '@talknest/bus';

import type { IMembersRepository } from '../../members/application/ports/members-repository';
import type { IPostsRepository } from './ports/posts-repository';
import {
  CreatePostResponse,
  CreatePostUseCase,
} from './use-cases/create-post/create-post';
import {
  GetPostDetailsResponse,
  GetPostDetailsUseCase,
} from './use-cases/get-post-details/get-post-details';
import {
  GetPostByIdResponse,
  GetPostByIdUseCase,
} from './use-cases/get-post-by-id/get-post-by-id';

export class PostsService {
  constructor(
    private postsRepo: IPostsRepository,
    private membersRepo: IMembersRepository,
    private eventBus: IEventBus,
  ) {}

  async getPosts(query: GetPostsQuery) {
    return this.postsRepo.findPosts(query);
  }

  async createPost(
    command: CreatePostCommand,
  ): Promise<CreatePostResponse> {
    return new CreatePostUseCase(
      this.postsRepo,
      this.membersRepo,
      this.eventBus,
    ).execute(command);
  }

  async getPostById(
    query: GetPostByIdQuery,
  ): Promise<GetPostByIdResponse> {
    return new GetPostByIdUseCase(this.postsRepo).execute(query);
  }

  async getPostDetailsById(
    id: string,
  ): Promise<GetPostDetailsResponse> {
    return new GetPostDetailsUseCase(this.postsRepo).execute(id);
  }
}
