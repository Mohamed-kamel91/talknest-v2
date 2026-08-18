import { IDatabase } from '@talknest/database';
import { EventBus } from '@talknest/bus';

import { type IPostsRepository } from './repos/ports/posts-repository';
import { ProductionPostsRepository } from './repos/adapters/production-posts-repository';
import { InMemoryPostsRepository } from './repos/adapters/in-memory-posts-repository';
import { type IMembersRepository } from '../members/repos/ports/members-repository';
import { PostsService } from './application/posts-service';
import { PostsController } from './posts-controller';
import { PostsRouter } from './posts-router';

import { type Config } from '../../shared/config';
import { ApplicationModule } from '../../shared/modules/application-module';
import { WebServer } from '../../shared/http';

export class PostsModule extends ApplicationModule {
  private postsRepository: IPostsRepository;
  private postsService: PostsService;
  private postsController: PostsController;
  private postsRouter: PostsRouter;

  private constructor(
    config: Config,
    private database: IDatabase,
    private eventBus: EventBus,
    private membersRepository: IMembersRepository,
  ) {
    super(config);
    this.postsRepository = this.createPostsRepository();
    this.postsService = this.createPostsService(membersRepository);
    this.postsController = this.createPostsController();
    this.postsRouter = this.createPostsRouter();

    this.setupRoutes();
  }

  public static build(
    db: IDatabase,
    eventBus: EventBus,
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

    return new ProductionPostsRepository(this.database);
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

  private setupRoutes() {
    this.postsRouter.register();
  }
}
