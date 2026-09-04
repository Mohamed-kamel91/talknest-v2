import { IDatabase } from '@talknest/database';
import { EventBus } from '@talknest/bus';

import { WebServer } from '../../shared/infra/http';
import { Config } from '../../shared/config';
import { ApplicationModule } from '../../shared/modules/application-module';

import type { IMembersRepository } from '../members/application/ports/members-repository';
import type { ICommentRepository } from '../comments/application/ports/comment-repository';
import type { IPostsRepository } from '../posts/application/ports/posts-repository';

import { VotesSubscriptions } from './application/subscriptions/votes-subscriptions';
import type { IVoteRepository } from './application/ports/vote-repository';
import { PrismaVotesRepository } from './infra/repos/prisma-votes-repo';
import { VotesService } from './application/votes-service';
import { VotesController } from './presentation/http/controllers';
import { VotesRouter } from './presentation/http/routes/votes-router';

export class VotesModule extends ApplicationModule {
  private votesRepository: IVoteRepository;
  private votesService: VotesService;
  private votesSubscriptions: VotesSubscriptions;
  private votesController: VotesController;
  private votesRouter: VotesRouter;

  private constructor(
    private db: IDatabase,
    private membersRepository: IMembersRepository,
    private commentRepository: ICommentRepository,
    private postsRepository: IPostsRepository,
    private eventBus: EventBus,
    config: Config,
  ) {
    super(config);
    this.votesRepository = this.createVotesRepository();
    this.votesService = this.createVotesService();
    this.votesSubscriptions = this.createVotesSubscriptions();
    this.votesController = this.createVotesController();
    this.votesRouter = this.createPostsRouter();

    this.votesRouter.register();
  }

  public static build(
    db: IDatabase,
    membersRepo: IMembersRepository,
    commentsRepo: ICommentRepository,
    postsRepo: IPostsRepository,
    eventBus: EventBus,
    config: Config,
  ) {
    return new VotesModule(
      db,
      membersRepo,
      commentsRepo,
      postsRepo,
      eventBus,
      config,
    );
  }

  public getVotesRepository() {
    return this.votesRepository;
  }

  public getVotesService() {
    return this.votesService;
  }

  public getVotesController() {
    return this.votesController;
  }

  public mountRouter(webServer: WebServer) {
    const path = this.votesRouter.basePath;
    const router = this.votesRouter.getRouter();
    webServer.mountRouter(path, router);
  }

  private createVotesSubscriptions() {
    return new VotesSubscriptions(this.eventBus, this.votesService);
  }

  private createVotesRepository() {
    if (this.votesRepository) return this.votesRepository;

    return new PrismaVotesRepository(this.db);
  }

  private createVotesService() {
    return new VotesService(
      this.membersRepository,
      this.commentRepository,
      this.postsRepository,
      this.votesRepository,
      this.eventBus,
    );
  }

  private createVotesController() {
    return new VotesController(this.votesService);
  }

  private createPostsRouter() {
    return new VotesRouter(this.votesController);
  }
}
