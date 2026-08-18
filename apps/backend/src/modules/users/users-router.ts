import { BaseRouter } from '../../shared/http/base-router';
import { type UsersController } from './users-controller';

export class UsersRouter extends BaseRouter {
  public readonly basePath: string = '/users';

  constructor(private controller: UsersController) {
    super();
  }

  protected setupRoutes(): void {
    this.router.post('/', this.controller.createUser);
    // this.router.get('/', this.controller.getUserByEmail);
    // this.router.get('/', this.controller.getUserById);
    // this.router.get('/', this.controller.getUserDetailsByEmail);
  }
}
