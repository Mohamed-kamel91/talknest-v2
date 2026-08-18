import { IdentityServiceAPI } from './external-services/ports/identity-service-api';
import { UserIdentityService } from './application/user-identity-service';
import { FirebaseAuth } from './external-services/adapters/firebase-auth';
import { UsersController } from './users-controller';
import { UsersRouter } from './users-router';

import { type Config } from '../../shared/config';
import { WebServer } from '../../shared/http';

export class UsersModule {
  private identityServiceAPI: IdentityServiceAPI;
  private usersService: UserIdentityService;
  private usersController: UsersController;
  private usersRouter: UsersRouter;

  private constructor(private config: Config) {
    this.identityServiceAPI = this.createIdentityServiceAPI(config);
    this.usersService = this.createUserService();
    this.usersController = this.createUserController();
    this.usersRouter = this.createUserRouter();

    this.setupRoutes();
  }

  public static build(config: Config) {
    return new UsersModule(config);
  }

  public getUsersService() {
    return this.usersService;
  }

  public getUsersController() {
    return this.usersController;
  }

  public mountRouter(webServer: WebServer) {
    const path = this.usersRouter.basePath;
    const router = this.usersRouter.getRouter();
    webServer.mountRouter(path, router);
  }

  private createUserController() {
    return new UsersController();
  }

  private createIdentityServiceAPI(config: Config) {
    return new FirebaseAuth();
  }

  private createUserService() {
    return new UserIdentityService(this.identityServiceAPI);
  }

  private createUserRouter() {
    return new UsersRouter(this.usersController);
  }

  private setupRoutes() {
    this.usersRouter.register();
  }
}
