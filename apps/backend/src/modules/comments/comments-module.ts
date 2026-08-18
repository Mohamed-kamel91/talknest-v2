import { EventBus } from '@talknest/bus';
import { IDatabase } from '@talknest/database';

import { ProductionCommentsRepository } from './repos/adapters/production-comment-repository';
import type { ICommentRepository } from './repos/ports/comment-repository';
import { CommentsService } from './application/comments-service';
import { CommentsController } from './comments-controller';
import { CommentsRouter } from './comments-router';

import { ProductionPostsRepository } from '../posts/repos/adapters/production-posts-repository';
import type { IPostsRepository } from '../posts/repos/ports/posts-repository';
import type { IMembersRepository } from '../members/repos/ports/members-repository';

import { ApplicationModule } from '../../shared/modules/application-module';
import { Config } from '../../shared/config';
import { WebServer } from '../../shared/http';

export class CommentsModule extends ApplicationModule {
  private commentsRepository: ICommentRepository;
  private postsRepository: IPostsRepository;
  private commentsService: CommentsService;
  private commentsController: CommentsController;
  private commentsRouter: CommentsRouter;

  private constructor(
    private db: IDatabase,
    private membersRepository: IMembersRepository,
    private eventBus: EventBus,
    config: Config,
  ) {
    super(config);

    this.commentsRepository = this.createCommentsRepository();
    this.postsRepository = this.createPostsRepository();
    this.commentsService = this.createCommentsService();
    this.commentsController = this.createCommentsController();
    this.commentsRouter = this.createCommentsRouter();

    this.setupRoutes();
  }

  public static build(
    db: IDatabase,
    eventBus: EventBus,
    membersRepo: IMembersRepository,
    config: Config,
  ) {
    return new CommentsModule(db, membersRepo, eventBus, config);
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

    return new ProductionCommentsRepository(this.db);
  }

  private createPostsRepository() {
    if (this.postsRepository) {
      return this.postsRepository;
    }

    return new ProductionPostsRepository(this.db);
  }

  private createCommentsService() {
    return new CommentsService(
      this.eventBus,
      this.commentsRepository,
      this.postsRepository,
      this.membersRepository,
    );
  }

  private createCommentsController() {
    return new CommentsController(this.commentsService);
  }

  private createCommentsRouter() {
    return new CommentsRouter(this.commentsController);
  }

  private setupRoutes() {
    this.commentsRouter.register();
  }
}
