import { BaseRouter } from '../../../../../shared/infra/http';
import { UsersController } from '../controllers';

export class UsersRouter extends BaseRouter {
  public readonly basePath: string = '/users';

  constructor(private controller: UsersController) {
    super();
  }

  protected setupRoutes(): void {
    this.router.post('/', this.controller.createUser().execute);
    // this.router.get('/', this.controller.getUserByEmail);
    // this.router.get('/', this.controller.getUserById);
    // this.router.get('/', this.controller.getUserDetailsByEmail);
  }
}
