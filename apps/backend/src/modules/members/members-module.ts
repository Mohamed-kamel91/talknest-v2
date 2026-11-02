import { type IEventBus } from '@talknest/bus';
import { type IDatabase } from '@talknest/database';

import { ApplicationModule } from '../../shared/modules/application-module';
import { Config } from '../../shared/config';
import { WebServer } from '../../shared/infra/http';

import type { IMembersRepository } from './application/ports';
import { PrismaMembersRepository } from './infra/repos/prisma';
import { InMemoryMembersRepository } from './infra/repos/in-memory';
import { MembersService } from './application/members-service';
import { MembersController } from './presentation/http/controllers';
import { MembersRouter } from './presentation/http/routes/members-routers';

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
    this.membersController = this.createMembersController();
    this.membersRouter = this.createMembersRouter();

    this.membersRouter.register();
  }

  public static build(db: IDatabase, eventBus: IEventBus, config: Config) {
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

  private createMembersRepository(db: IDatabase) {
    if (this.shouldBuildFakeRepository) {
      return new InMemoryMembersRepository();
    }

    return new PrismaMembersRepository(db);
  }

  private createMembersService() {
    return new MembersService(this.membersRepository, this.eventBus);
  }

  private createMembersController() {
    return new MembersController(this.membersService);
  }

  private createMembersRouter() {
    return new MembersRouter(this.membersController);
  }
}
