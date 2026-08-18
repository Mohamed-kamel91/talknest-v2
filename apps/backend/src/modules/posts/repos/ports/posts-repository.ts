import { DatabaseError } from '@talknest/errors/server';
import { GetPostsQuery } from '@talknest/api/posts';
import { DomainEvent } from '@talknest/core/domain';

import { Post } from '../../domain/post';
import { PostReadModel } from '../../domain/post-read-model';

export interface IPostsRepository {
  findPosts(query: GetPostsQuery): Promise<PostReadModel[]>;
  save(post: Post): Promise<void | DatabaseError>;
  getPostById(id: string): Promise<Post | null>;
  getPostDetailsById(id: string): Promise<PostReadModel | null>;
  getPostBySlug(slug: string): Promise<PostReadModel | null>;
}
