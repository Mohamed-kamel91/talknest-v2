import { Result } from '@talknest/core';
import { PostCommentCommand } from '@talknest/api/comments';
import { EventBus } from '@talknest/bus';

import {
  PostCommentUseCase,
  PostCommentError,
} from './use-cases/post-comment/post-comment';
import { Comment } from '../domain/entities/comment';
import { ICommentRepository } from './ports/comment-repository';
import { IPostsRepository } from '../../posts/application/posts-repository';
import { IMembersRepository } from '../../members/application/ports/members-repository';

export class CommentsService {
  constructor(
    private eventBus: EventBus,
    private commentRepo: ICommentRepository,
    private postRepo: IPostsRepository,
    private membersRepo: IMembersRepository,
  ) {}

  public postComment(
    command: PostCommentCommand,
  ): Promise<Result<Comment, PostCommentError>> {
    return new PostCommentUseCase(
      this.commentRepo,
      this.postRepo,
      this.membersRepo,
      this.eventBus,
    ).execute(command);
  }

  public async getCommentsByPostId(
    postId: string,
  ): Promise<Result<Comment[], PostCommentError>> {
    const comments =
      await this.commentRepo.getCommentsByPostId(postId);
    return Result.success(comments);
  }
}
