import { DatabaseError } from '@talknest/errors/server';
import { GetPostsQuery } from '@talknest/api/posts';

import { PostReadModel } from '../read-models/post-read-model';
import { Post } from '../../domain/post';

export interface IPostsRepository {
  save(post: Post): Promise<void | DatabaseError>;
  findById(id: string): Promise<Post | null>;
  getBySlug(slug: string): Promise<PostReadModel | null>;
  getDetailsById(id: string): Promise<PostReadModel | null>;
  findPosts(query: GetPostsQuery): Promise<PostReadModel[]>;
  updateVoteScore(postId: string, scoreChange: number): Promise<void>;
}
