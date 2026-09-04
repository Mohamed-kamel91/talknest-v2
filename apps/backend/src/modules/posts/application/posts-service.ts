import {
  CreatePostCommand,
  GetPostsQuery,
} from '@talknest/api/posts';
import { EventBus } from '@talknest/bus';

import { IMembersRepository } from '../../members/application/ports/members-repository';
import { IPostsRepository } from './ports/posts-repository';
import { CreatePostUseCase } from './use-cases/create-post/create-post';
import { GetPostDetailsUseCase } from './use-cases/get-post-details/get-post-details';

export class PostsService {
  constructor(
    private postsRepo: IPostsRepository,
    private membersRepo: IMembersRepository,
    private eventBus: EventBus,
  ) {}

  async getPosts(query: GetPostsQuery) {
    return this.postsRepo.findPosts(query);
  }

  async createPost(command: CreatePostCommand) {
    return new CreatePostUseCase(
      this.postsRepo,
      this.membersRepo,
      this.eventBus,
    ).execute(command);
  }

  async getPostById(id: string) {
    return this.postsRepo.getPostById(id);
  }

  async getPostDetailsById(id: string) {
    return new GetPostDetailsUseCase(this.postsRepo).execute(id);
  }
}
