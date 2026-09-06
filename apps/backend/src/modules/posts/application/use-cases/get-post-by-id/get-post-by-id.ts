import {
  Result,
  success,
  fail,
  type IUseCase,
} from '@talknest/core/application';
import { GetPostByIdQuery } from '@talknest/api/posts';

import { Post } from '../../../domain/post';
import { PostNotFoundError } from '../../../domain/errors/posts-errors';
import type { IPostsRepository } from '../../ports/posts-repository';

export type GetPostByIdResponse = Result<Post, PostNotFoundError>;

export class GetPostByIdUseCase implements IUseCase<
  GetPostByIdQuery,
  GetPostByIdResponse
> {
  constructor(private postsRepo: IPostsRepository) {}

  async execute(
    query: GetPostByIdQuery,
  ): Promise<GetPostByIdResponse> {
    const post = await this.postsRepo.getPostById(query.props.postId);

    if (!post) {
      return fail(new PostNotFoundError());
    }

    return success(post);
  }
}
