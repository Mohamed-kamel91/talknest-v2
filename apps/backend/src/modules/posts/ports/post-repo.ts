import { type Post } from '@talknest/api/posts';

import { type getPostsQuery } from '../post-query';

export interface IPostRepo {
  getAll: (dto: getPostsQuery) => Promise<Post[]>;
}
