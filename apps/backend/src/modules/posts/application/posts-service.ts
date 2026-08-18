import {
  CreatePostCommand,
  GetPostsQuery,
} from '@talknest/api/posts';
import { EventBus } from '@talknest/bus';

import { CreatePost } from './use-cases/create-post/create-post';
import { IMembersRepository } from '../../members/repos/ports/members-repository';
import { IPostsRepository } from '../repos/ports/posts-repository';
import { GetPostDetails } from './use-cases/create-post/get-post-details';

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
    return new CreatePost(
      this.postsRepo,
      this.membersRepo,
      this.eventBus,
    ).execute(command);
  }

  async getPostById(id: string) {
    return this.postsRepo.getPostById(id);
  }

  async getPostDetailsById(id: string) {
    return new GetPostDetails(this.postsRepo).execute(id);
  }
}
