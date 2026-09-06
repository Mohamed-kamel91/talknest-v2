import { BaseRouter } from '../../../../../shared/infra/http/base-router';
import { PostsController } from '../controllers';

export class PostsRouter extends BaseRouter {
  public readonly basePath: string = '/posts';

  constructor(private controller: PostsController) {
    super();
  }

  protected setupRoutes(): void {
    this.router.get('/', this.controller.getPosts().execute);
    this.router.post('/', this.controller.createPost().execute);
    this.router.get(
      '/:postId',
      this.controller.getPostById().execute,
    );
  }
}
