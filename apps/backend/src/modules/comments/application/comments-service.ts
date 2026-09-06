import { PostCommentCommand } from '@talknest/api/comments';
import { EventBus } from '@talknest/bus';

import type { IMembersRepository } from '../../members/application/ports/members-repository';
import type { IPostsRepository } from '../../posts/application/ports/posts-repository';

import { ICommentRepository } from './ports/comment-repository';
import {
  PostCommentUseCase,
  PostCommentResponse,
} from './use-cases/post-comment/post-comment';
import {
  GetCommentsByPostIdResponse,
  getCommentsByPostIdUseCase,
} from './use-cases/get-comments-by-post-id/get-comments-by-post-id';

export class CommentsService {
  constructor(
    private eventBus: EventBus,
    private commentRepo: ICommentRepository,
    private postRepo: IPostsRepository,
    private membersRepo: IMembersRepository,
  ) {}

  public postComment(
    command: PostCommentCommand,
  ): Promise<PostCommentResponse> {
    return new PostCommentUseCase(
      this.commentRepo,
      this.postRepo,
      this.membersRepo,
      this.eventBus,
    ).execute(command);
  }

  public async getCommentsByPostId(
    postId: string,
  ): Promise<GetCommentsByPostIdResponse> {
    return new getCommentsByPostIdUseCase(this.commentRepo).execute(
      postId,
    );
  }
}
