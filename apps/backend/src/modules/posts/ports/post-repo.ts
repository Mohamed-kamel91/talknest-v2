import type { Post } from '@talknest/shared/api/post';
import type { getPostsQuery } from '../post-query';

export interface IPostRepo {
  getAll: (dto: getPostsQuery) => Promise<Post[]>;
}
