import { GetPostsQuery } from '@talknest/api';
import { success, type Result, type IUseCase } from '@talknest/core';

import { PostNotFoundError } from '../../../domain/errors/posts-errors';
import { PostReadModel } from '../../read-models/post-read-model';
import { IPostsRepository } from '../../ports/posts-repository';

export type GetPostsResponse = Result<
  PostReadModel[],
  PostNotFoundError
>;

export class GetPostsUseCase implements IUseCase<
  GetPostsQuery,
  GetPostsResponse
> {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(query: GetPostsQuery): Promise<GetPostsResponse> {
    const posts = await this.postsRepository.findPosts(query);
    return success(posts);
  }
}
