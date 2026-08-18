import { BaseRouter } from '../../shared/http/base-router';
import { type MembersController } from './members-controller';

export class MembersRouter extends BaseRouter {
  public readonly basePath: string = '/members';

  constructor(private controller: MembersController) {
    super();
  }

  protected setupRoutes(): void {
    this.router.post('/', this.controller.createMember);
  }
}
