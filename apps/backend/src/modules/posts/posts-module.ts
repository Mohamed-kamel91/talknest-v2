import { IDatabase } from '@talknest/database';
import { IEventBus } from '@talknest/bus';

import { type Config } from '../../shared/config';
import { ApplicationModule } from '../../shared/modules/application-module';
import { WebServer } from '../../shared/infra/http';

import type { IMembersRepository } from '../members/application/ports/members-repository';

import type { IPostsRepository } from './application/ports/posts-repository';
import { PrismaPostsRepository } from './infra/repos/prisma-posts-repository';
import { InMemoryPostsRepository } from './infra/repos/in-memory-posts-repository';
import { PostsService } from './application/posts-service';
import { PostsController } from './presentation/http/controllers';
import { PostsRouter } from './presentation/http/routes/posts-router';

export class PostsModule extends ApplicationModule {
  private postsRepository: IPostsRepository;
  private postsService: PostsService;
  private postsController: PostsController;
  private postsRouter: PostsRouter;

  private constructor(
    config: Config,
    private database: IDatabase,
    private eventBus: IEventBus,
    private membersRepository: IMembersRepository,
  ) {
    super(config);
    this.postsRepository = this.createPostsRepository();
    this.postsService = this.createPostsService(membersRepository);
    this.postsController = this.createPostsController();
    this.postsRouter = this.createPostsRouter();

    this.postsRouter.register();
  }

  public static build(
    db: IDatabase,
    eventBus: IEventBus,
    membersRepository: IMembersRepository,
    config: Config,
  ) {
    return new PostsModule(config, db, eventBus, membersRepository);
  }

  public getPostsRepository() {
    return this.postsRepository;
  }

  public getPostsService() {
    return this.postsService;
  }

  public getPostsController() {
    return this.postsController;
  }

  public mountRouter(webServer: WebServer) {
    const path = this.postsRouter.basePath;
    const router = this.postsRouter.getRouter();
    webServer.mountRouter(path, router);
  }

  private createPostsRepository() {
    if (this.config.getScript() === 'test:unit') {
      return new InMemoryPostsRepository();
    }

    return new PrismaPostsRepository(this.database);
  }

  private createPostsService(membersRepository: IMembersRepository) {
    return new PostsService(
      this.postsRepository,
      membersRepository,
      this.eventBus,
    );
  }

  private createPostsController() {
    return new PostsController(this.postsService);
  }

  private createPostsRouter() {
    return new PostsRouter(this.postsController);
  }
}
