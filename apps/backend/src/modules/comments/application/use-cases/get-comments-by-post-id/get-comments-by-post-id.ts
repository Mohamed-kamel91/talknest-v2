import { Result, success, type IUseCase } from '@talknest/core/application';
import { NotFoundError } from '@talknest/errors/application';

import type { ICommentsRepository } from '../../ports/';
import { Comment } from '../../../domain/comment';

export type getCommentsByPostIdError = NotFoundError;
export type GetCommentsByPostIdResponse = Result<Comment[], getCommentsByPostIdError>;

export class getCommentsByPostIdUseCase implements IUseCase<string, GetCommentsByPostIdResponse> {
  constructor(private commentsRepository: ICommentsRepository) {}

  async execute(postId: string): Promise<GetCommentsByPostIdResponse> {
    const comments = await this.commentsRepository.findByPostId(postId);

    return success(comments);
  }
}
