import { type Result, success, type UseCase } from '@talknest/core';

import { PostReadModel } from '../../../domain/post-read-model';
import { PostNotFoundError } from '../../../posts-errors';
import { IPostsRepository } from '../../../repos/ports/posts-repository';

export type GetPostDetailsResponse = Result<
  PostReadModel,
  PostNotFoundError
>;

export class GetPostDetails implements UseCase<
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
