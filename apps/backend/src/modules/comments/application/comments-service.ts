import { PostCommentCommand } from '@talknest/api/comments';
import { type IEventBus } from '@talknest/bus';

import type { IMembersRepository } from '../../members/application/ports/members-repository';
import type { IPostsRepository } from '../../posts/application/ports/posts-repository';
import type { ICommentsRepository } from './ports/comments-repository';
import {
  PostCommentUseCase,
  type PostCommentResponse,
} from './use-cases/post-comment/post-comment';
import {
  getCommentsByPostIdUseCase,
  type GetCommentsByPostIdResponse,
} from './use-cases/get-comments-by-post-id/get-comments-by-post-id';

export class CommentsService {
  constructor(
    private commentsRepository: ICommentsRepository,
    private postsRepository: IPostsRepository,
    private membersRepository: IMembersRepository,
    private eventBus: IEventBus,
  ) {}

  public postComment(
    command: PostCommentCommand,
  ): Promise<PostCommentResponse> {
    return new PostCommentUseCase(
      this.commentsRepository,
      this.postsRepository,
      this.membersRepository,
      this.eventBus,
    ).execute(command);
  }

  public async getCommentsByPostId(
    postId: string,
  ): Promise<GetCommentsByPostIdResponse> {
    return new getCommentsByPostIdUseCase(
      this.commentsRepository,
    ).execute(postId);
  }
}
