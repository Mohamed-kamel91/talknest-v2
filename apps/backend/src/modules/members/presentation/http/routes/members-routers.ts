import { BaseRouter } from '../../../../../shared/infra/http';
import { MembersController } from '../controllers';

export class MembersRouter extends BaseRouter {
  public readonly basePath: string = '/members';

  constructor(private controller: MembersController) {
    super();
  }

  protected setupRoutes(): void {
    this.router.post('/', this.controller.createMember().execute);
  }
}
