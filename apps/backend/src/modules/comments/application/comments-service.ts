import { Result } from '@talknest/core';
import { PostCommentCommand } from '@talknest/api/comments';
import { EventBus } from '@talknest/bus';

import {
  PostComment,
  PostCommentError,
} from './use-cases/post-comment/post-comment';
import { Comment } from '../domain/comment';
import { ICommentRepository } from '../repos/ports/comment-repository';
import { IPostsRepository } from '../../posts/repos/ports/posts-repository';
import { IMembersRepository } from '../../members/repos/ports/members-repository';

export class CommentsService {
  constructor(
    private eventBus: EventBus,
    private commentRepo: ICommentRepository,
    private postRepo: IPostsRepository,
    private membersRepo: IMembersRepository,
  ) {}

  async postComment(
    command: PostCommentCommand,
  ): Promise<Result<Comment, PostCommentError>> {
    return new PostComment(
      this.commentRepo,
      this.postRepo,
      this.membersRepo,
      this.eventBus,
    ).execute(command);
  }

  async getCommentsByPostId(
    postId: string,
  ): Promise<Result<Comment[], PostCommentError>> {
    const comments =
      await this.commentRepo.getCommentsByPostId(postId);
    return Result.success(comments);
  }
}
