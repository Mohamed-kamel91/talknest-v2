import {
  Result,
  success,
  type IUseCase,
} from '@talknest/core/application';
import { NotFoundError } from '@talknest/errors/application';

import type { ICommentRepository } from '../../ports/comment-repository';
import { Comment } from '../../../domain/comment';

export type PostCommentError = NotFoundError;
export type GetCommentsByPostIdResponse = Result<
  Comment[],
  PostCommentError
>;

export class getCommentsByPostIdUseCase implements IUseCase<
  string,
  GetCommentsByPostIdResponse
> {
  constructor(private commentRepo: ICommentRepository) {}

  async execute(
    postId: string,
  ): Promise<GetCommentsByPostIdResponse> {
    const comments =
      await this.commentRepo.getCommentsByPostId(postId);

    return success(comments);
  }
}
