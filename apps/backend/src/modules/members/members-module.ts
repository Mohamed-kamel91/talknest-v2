import { IEventBus } from '@talknest/bus';
import { IDatabase } from '@talknest/database';

import { ApplicationModule } from '../../shared/modules/application-module';
import { Config } from '../../shared/config';
import { WebServer } from '../../shared/infra/http';

import { PrismaMembersRepository } from './infra/repo/prisma-members-repository';
import { IMembersRepository } from './application/ports/members-repository';
import { MembersService } from './application/members-service';
import { MembersController } from './presentation/http/controllers';
import { MembersRouter } from './presentation/http/routes/members-routers';
import { InMemoryMembersRepository } from './infra/repo/in-memory-members-repository';

export class MembersModule extends ApplicationModule {
  private membersRepository: IMembersRepository;
  private membersService: MembersService;
  private membersController: MembersController;
  private membersRouter: MembersRouter;

  private constructor(
    private db: IDatabase,
    private eventBus: IEventBus,
    config: Config,
  ) {
    super(config);

    this.membersRepository = this.createMembersRepository(db);
    this.membersService = this.createMembersService();
    this.membersController = this.createMembersController(config);
    this.membersRouter = this.createMembersRouter();

    this.membersRouter.register();
  }

  public static build(
    db: IDatabase,
    eventBus: IEventBus,
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
    return new MembersService(this.membersRepository, this.eventBus);
  }

  private createMembersController(config: Config) {
    return new MembersController(this.membersService, config);
  }

  private createMembersRepository(db: IDatabase) {
    if (this.shouldBuildFakeRepository) {
      return new InMemoryMembersRepository();
    }

    return new PrismaMembersRepository(db);
  }

  private createMembersRouter() {
    return new MembersRouter(this.membersController);
  }
}
