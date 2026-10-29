import { type IDatabase } from '@talknest/database';
import { type IEventBus } from '@talknest/bus';

import { WebServer } from '../../shared/infra/http';
import { Config } from '../../shared/config';
import { ApplicationModule } from '../../shared/modules/application-module';

import type { IMembersRepository } from '../members/application/ports/members-repository';
import type { ICommentsRepository } from '../comments/application/ports/comments-repository';
import type { IPostsRepository } from '../posts/application/ports/posts-repository';

import type {
  ICommentVotesReadRepository,
  ICommentVotesRepository,
  IPostVotesReadRepository,
  IPostVotesRepository,
} from './application/ports';
import {
  PrismaCommentVotesReadRepository,
  PrismaCommentVotesRepository,
  PrismaPostVotesReadRepository,
  PrismaPostVotesRepository,
  InMemoryCommentVotesReadRepository,
  InMemoryCommentVotesRepository,
  InMemoryPostVotesReadRepository,
  InMemoryPostVotesRepository,
} from './infra/repos';
import { VotesService } from './application/votes-service';
import { VotesController } from './presentation/http/controllers';
import { VotesRouter } from './presentation/http/routes/votes-router';
import { VotesSubscriptions } from './application/subscriptions/votes-subscriptions';

export class VotesModule extends ApplicationModule {
  private commentVotesRepository: ICommentVotesRepository;
  private postVotesRepository: IPostVotesRepository;

  private commentVotesReadRepository: ICommentVotesReadRepository;
  private postVotesReadRepository: IPostVotesReadRepository;

  private votesService: VotesService;
  private votesSubscriptions: VotesSubscriptions;
  private votesController: VotesController;
  private votesRouter: VotesRouter;

  private constructor(
    private db: IDatabase,
    private membersRepository: IMembersRepository,
    private commentRepository: ICommentsRepository,
    private postsRepository: IPostsRepository,
    private eventBus: IEventBus,
    config: Config,
  ) {
    super(config);
    this.postVotesRepository = this.createPostVotesRepository();
    this.commentVotesRepository = this.createCommentVotesRepository();

    this.postVotesReadRepository = this.createPostVotesReadRepository();
    this.commentVotesReadRepository = this.createCommentVotesReadRepository();

    this.votesService = this.createVotesService();
    this.votesSubscriptions = this.createVotesSubscriptions();
    this.votesController = this.createVotesController();
    this.votesRouter = this.createPostsRouter();

    this.setupRoutes();
    this.setupSubscriptions();
  }

  public static build(
    db: IDatabase,
    membersRepository: IMembersRepository,
    commentsRepository: ICommentsRepository,
    postsRepository: IPostsRepository,
    eventBus: IEventBus,
    config: Config,
  ) {
    return new VotesModule(
      db,
      membersRepository,
      commentsRepository,
      postsRepository,
      eventBus,
      config,
    );
  }

  // ---- Public accessors ----

  public getCommentVotesRepository() {
    return this.commentVotesRepository;
  }

  public getPostVotesRepository() {
    return this.postVotesRepository;
  }

  public getCommentVotesReadRepository() {
    return this.commentVotesReadRepository;
  }

  public getPostVotesReadRepository() {
    return this.postVotesReadRepository;
  }

  public getVotesService() {
    return this.votesService;
  }

  public getVotesController() {
    return this.votesController;
  }

  // ---- Setup ----

  private setupSubscriptions(): void {
    this.votesSubscriptions.register();
  }

  private setupRoutes(): void {
    this.votesRouter.register();
  }

  public mountRouter(webServer: WebServer) {
    const path = this.votesRouter.basePath;
    const router = this.votesRouter.getRouter();
    webServer.mountRouter(path, router);
  }

  // ---- Write repositories ----

  private createPostVotesRepository(): IPostVotesRepository {
    if (this.shouldBuildFakeRepository) {
      return new InMemoryPostVotesRepository();
    }

    return new PrismaPostVotesRepository(this.db);
  }

  private createCommentVotesRepository(): ICommentVotesRepository {
    if (this.shouldBuildFakeRepository) {
      return new InMemoryCommentVotesRepository();
    }

    return new PrismaCommentVotesRepository(this.db);
  }

  // ---- Read repositories ----

  private createPostVotesReadRepository(): IPostVotesReadRepository {
    if (this.shouldBuildFakeRepository) {
      return new InMemoryPostVotesReadRepository();
    }

    return new PrismaPostVotesReadRepository(this.db);
  }

  private createCommentVotesReadRepository(): ICommentVotesReadRepository {
    if (this.shouldBuildFakeRepository) {
      return new InMemoryCommentVotesReadRepository();
    }

    return new PrismaCommentVotesReadRepository(this.db);
  }

  // ---- Services ----

  private createVotesService(): VotesService {
    return new VotesService(
      this.membersRepository,
      this.commentRepository,
      this.postsRepository,
      this.postVotesRepository,
      this.commentVotesRepository,
      this.postVotesReadRepository,
      this.commentVotesReadRepository,
      this.eventBus,
    );
  }

  private createVotesSubscriptions() {
    return new VotesSubscriptions(this.eventBus, this.votesService);
  }

  private createVotesController() {
    return new VotesController(this.votesService);
  }

  private createPostsRouter() {
    return new VotesRouter(this.votesController);
  }
}
