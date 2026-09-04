import { Result, fail, success, type UseCase } from '@talknest/core';

import { PostNotFoundError } from '../../../domain/errors/posts-errors';
import { IPostsRepository } from '../../ports/posts-repository';
import { PostReadModel } from '../../read-models/post-read-model';

export type GetPostDetailsResponse = Result<
  PostReadModel,
  PostNotFoundError
>;

export class GetPostDetailsUseCase implements UseCase<
  string,
  GetPostDetailsResponse
> {
  constructor(private postsRepo: IPostsRepository) {}

  async execute(id: string): Promise<GetPostDetailsResponse> {
    const post = await this.postsRepo.getPostDetailsById(id);

    if (post === null) {
      return fail(new PostNotFoundError());
    }

    return success(post);
  }
}
