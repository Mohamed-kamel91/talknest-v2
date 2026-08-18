import { EventBus } from '@talknest/bus';
import { IDatabase } from '@talknest/database';

import { ProductionMembersRepository } from './repos/adapters/production-members-repository';
import { IMembersRepository } from './repos/ports/members-repository';
import { MemberService } from './application/members-service';
import { MembersController } from './members-controller';
import { MembersRouter } from './members-routers';

import { ApplicationModule } from '../../shared/modules/application-module';
import { Config } from '../../shared/config';
import { WebServer } from '../../shared/http';

export class MembersModule extends ApplicationModule {
  private membersRepository: IMembersRepository;
  private membersService: MemberService;
  private membersController: MembersController;
  private membersRouter: MembersRouter;

  private constructor(
    private db: IDatabase,
    private eventBus: EventBus,
    config: Config,
  ) {
    super(config);

    this.membersRepository = this.createMembersRepository(db);
    this.membersService = this.createMembersService();
    this.membersController = this.createMembersController(config);
    this.membersRouter = this.createMembersRouter();

    this.setupRoutes();
  }

  public static build(
    db: IDatabase,
    eventBus: EventBus,
    config: Config,
  ) {
    return new MembersModule(db, eventBus, config);
  }

  public getMembersRepository() {
    return this.membersRepository;
  }

  public getMembersService() {
    return this.membersService;
  }

  public getMembersController() {
    return this.membersController;
  }

  public mountRouter(webServer: WebServer) {
    const path = this.membersRouter.basePath;
    const router = this.membersRouter.getRouter();
    webServer.mountRouter(path, router);
  }

  private createMembersService() {
    return new MemberService(this.membersRepository, this.eventBus);
  }

  private createMembersController(config: Config) {
    return new MembersController(this.membersService, config);
  }

  private createMembersRepository(db: IDatabase) {
    return new ProductionMembersRepository(db);
  }

  private createMembersRouter() {
    return new MembersRouter(this.membersController);
  }

  private setupRoutes() {
    this.membersRouter.register();
  }
}
