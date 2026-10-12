import { type IEventBus } from '@talknest/bus';
import { type IDatabase } from '@talknest/database';

import { ApplicationModule } from '../../shared/modules/application-module';
import { Config } from '../../shared/config';
import { WebServer } from '../../shared/infra/http';

import type { IPostsRepository } from '../posts/application/ports/posts-repository';
import type { IMembersRepository } from '../members/application/ports/members-repository';

import type { ICommentsRepository } from './application/ports/comments-repository';
import { PrismaCommentsRepository } from './infra/repos/prisma-comments-repository';
import { CommentsService } from './application/comments-service';
import { CommentsController } from './presentation/http/controllers';
import { CommentsRouter } from './presentation/http/routes/comments-router';

export class CommentsModule extends ApplicationModule {
  private commentsRepository: ICommentsRepository;
  private commentsService: CommentsService;
  private commentsController: CommentsController;
  private commentsRouter: CommentsRouter;

  private constructor(
    private db: IDatabase,
    private membersRepository: IMembersRepository,
    private postsRepository: IPostsRepository,
    private eventBus: IEventBus,
    config: Config,
  ) {
    super(config);

    this.commentsRepository = this.createCommentsRepository();
    this.commentsService = this.createCommentsService();
    this.commentsController = this.createCommentsController();
    this.commentsRouter = this.createCommentsRouter();

    this.commentsRouter.register();
  }

  public static build(
    db: IDatabase,
    eventBus: IEventBus,
    membersRepo: IMembersRepository,
    postsRepository: IPostsRepository,
    config: Config,
  ) {
    return new CommentsModule(
      db,
      membersRepo,
      postsRepository,
      eventBus,
      config,
    );
  }

  public getCommentsRepository() {
    return this.commentsRepository;
  }

  public getCommentsService() {
    return this.commentsService;
  }

  public getCommentsController() {
    return this.commentsController;
  }

  public mountRouter(webServer: WebServer) {
    const path = this.commentsRouter.basePath;
    const router = this.commentsRouter.getRouter();
    webServer.mountRouter(path, router);
  }

  private createCommentsRepository() {
    if (this.commentsRepository) {
      return this.commentsRepository;
    }

    return new PrismaCommentsRepository(this.db);
  }

  private createCommentsService() {
    return new CommentsService(
      this.commentsRepository,
      this.postsRepository,
      this.membersRepository,
      this.eventBus,
    );
  }

  private createCommentsController() {
    return new CommentsController(this.commentsService);
  }

  private createCommentsRouter() {
    return new CommentsRouter(this.commentsController);
  }
}
