import { GetPostsQuery } from '@talknest/api/posts';
import { DatabaseError } from '@talknest/errors/server';
import { DomainEvent } from '@talknest/core/domain';

import { Post } from '../../domain/post';
import { PostReadModel } from '../../domain/post-read-model';
import { IPostsRepository } from '../ports/posts-repository';

export class InMemoryPostsRepository implements IPostsRepository {
  private posts: PostReadModel[];

  constructor(posts?: PostReadModel[]) {
    this.posts = posts ? posts : [];
  }
  getPostById(id: string): Promise<Post | null> {
    throw new Error('Method not implemented.');
  }

  async findPosts(query: GetPostsQuery): Promise<PostReadModel[]> {
    return this.posts;
  }

  public static createWithSeedData(): InMemoryPostsRepository {
    // Put seed data here
    return new InMemoryPostsRepository();
  }

  public async save(post: Post): Promise<void | DatabaseError> {
    return Promise.resolve();
  }

  public async getPostDetailsById(
    id: string,
  ): Promise<PostReadModel | null> {
    return this.posts.find((post) => post.id === id) || null;
  }

  public async getPostBySlug(
    slug: string,
  ): Promise<PostReadModel | null> {
    return this.posts.find((post) => post.slug === slug) || null;
  }
}
