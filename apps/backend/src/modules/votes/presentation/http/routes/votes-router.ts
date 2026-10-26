import { BaseRouter } from '../../../../../shared/infra/http';
import { VotesController } from '../controllers';

export class VotesRouter extends BaseRouter {
  public readonly basePath: string = '/posts';

  constructor(private readonly controller: VotesController) {
    super();
  }

  protected setupRoutes(): void {
    this.router.post('/:postId/vote', this.controller.castVoteOnPost().execute);
    this.router.post(
      '/:postId/comments/:commentId/vote',
      this.controller.castVoteOnComment().execute,
    );
  }
}
