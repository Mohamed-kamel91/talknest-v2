import { type CommentsController } from './comments-controller';
import { BaseRouter } from '../../shared/http/base-router';

export class CommentsRouter extends BaseRouter {
  public readonly basePath: string = '/posts';

  constructor(private controller: CommentsController) {
    super();
  }

  protected setupRoutes(): void {
    this.router.get(
      '/:postId/comments',
      this.controller.getCommentsByPostId,
    );
    this.router.post(
      '/:postId/comments',
      this.controller.postComment,
    );
  }
}
