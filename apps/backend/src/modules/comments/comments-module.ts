import { type IEventBus } from '@talknest/bus';
import { type IDatabase } from '@talknest/database';

import { ApplicationModule } from '../../shared/modules/application-module';
import { Config } from '../../shared/config';
import { WebServer } from '../../shared/infra/http';

import type { IPostsRepository } from '../posts/application/ports';
import type { IMembersRepository } from '../members/application/ports';

import type {
  ICommentsReadRepository,
  ICommentsRepository,
} from './application/ports';
import {
  PrismaCommentsRepository,
  InMemoryCommentsRepository,
  InMemoryCommentsReadRepository,
  PrismaCommentsReadRepository,
} from './infra/repos';
import { CommentsService } from './application/comments-service';
import { CommentsController } from './presentation/http/controllers';
import { CommentsRouter } from './presentation/http/routes/comments-router';
import { CommentProjector } from './application/projections/comment-projector';
import { CommentSubscriptions } from './application/subscriptions/comment-subscriptions';

export class CommentsModule extends ApplicationModule {
  private commentsRepository: ICommentsRepository;
  private commentsReadRepository: ICommentsReadRepository;
  private commentsService: CommentsService;
  private commentsController: CommentsController;
  private commentsRouter: CommentsRouter;

  private commentProjector: CommentProjector;
  private commentSubscriptions: CommentSubscriptions;

  private constructor(
    private db: IDatabase,
    private membersRepository: IMembersRepository,
    private postsRepository: IPostsRepository,
    private eventBus: IEventBus,
    config: Config,
  ) {
    super(config);

    this.commentsRepository = this.createCommentsRepository();
    this.commentsReadRepository = this.createCommentReadRepository();
    this.commentsService = this.createCommentsService();
    this.commentsController = this.createCommentsController();
    this.commentsRouter = this.createCommentsRouter();

    this.commentProjector = this.createCommentProjector();
    this.commentSubscriptions = this.createCommentSubscriptions();

    this.setupSubscriptions();
    this.registerRoutes();
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

  public mountRouter(webServer: WebServer) {
    const path = this.commentsRouter.basePath;
    const router = this.commentsRouter.getRouter();
    webServer.mountRouter(path, router);
  }

  public getCommentsReadRepository() {
    return this.commentsReadRepository;
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

  private createCommentsRepository() {
    if (this.shouldBuildFakeRepository) {
      return new InMemoryCommentsRepository();
    }

    return new PrismaCommentsRepository(this.db);
  }

  private createCommentReadRepository() {
    if (this.shouldBuildFakeRepository) {
      return new InMemoryCommentsReadRepository();
    }

    return new PrismaCommentsReadRepository(this.db);
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

  private createCommentProjector() {
    return new CommentProjector(this.db, this.commentsReadRepository);
  }

  private createCommentSubscriptions() {
    return new CommentSubscriptions(
      this.eventBus,
      this.commentProjector,
    );
  }

  private setupSubscriptions() {
    this.commentSubscriptions.register();
  }

  private registerRoutes() {
    this.commentsRouter.register();
  }
}
