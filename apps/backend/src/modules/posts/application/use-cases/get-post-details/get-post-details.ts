import { Result, fail, success, type IUseCase } from '@talknest/core';

import type { IPostsRepository } from '../../ports';
import { PostReadModel } from '../../read-models/post-read-model';
import { PostNotFoundError } from '../../../domain/errors/posts-errors';

export type GetPostDetailsResponse = Result<
  PostReadModel,
  PostNotFoundError
>;

export class GetPostDetailsUseCase implements IUseCase<
  string,
  GetPostDetailsResponse
> {
  constructor(private postsRepo: IPostsRepository) {}

  async execute(id: string): Promise<GetPostDetailsResponse> {
    const post = await this.postsRepo.getDetailsById(id);

    if (post === null) {
      return fail(new PostNotFoundError());
    }

    return success(post);
  }
}
