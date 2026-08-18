import { type IDatabase, PrismaDatabase } from '@talknest/database';
import { EventBus, InMemoryEventBus } from '@talknest/bus';

import { NotificationsModule } from '../../modules/notifications';
import { MarketingModule } from '../../modules/marketing';
import { UsersModule } from '../../modules/users';
import { PostsModule } from '../../modules/posts';
import { VotesModule } from '../../modules/votes';
import { MembersModule } from '../../modules/members';
import { CommentsModule } from '../../modules/comments';

import { type Config } from '../config';
import { WebServer } from '../http';
import { Application } from '../application';
import { errorHandler } from '../errors/error-handler';

type ModuleName =
  | 'members'
  | 'users'
  | 'votes'
  | 'posts'
  | 'notifications'
  | 'marketing';

export class CompositionRoot {
  private static instance: CompositionRoot | null = null;

  private config: Config;

  private eventBus: EventBus;
  private database: IDatabase;
  private webServer: WebServer;

  private notificationsModule!: NotificationsModule;
  private marketingModule!: MarketingModule;
  private usersModule!: UsersModule;

  private postsModule!: PostsModule;
  private votesModule!: VotesModule;
  private membersModule!: MembersModule;
  private commentsModule!: CommentsModule;

  public static createCompositionRoot(config: Config) {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new this(config);
    }

    return CompositionRoot.instance;
  }

  private constructor(config: Config) {
    this.config = config;

    this.eventBus = this.createEventBus();
    this.database = this.createDatabase();
    this.webServer = this.createWebServer();
  }

  async start() {
    // Start services
    await this.database.connect();
    await this.webServer.start();
    await this.eventBus.initialize();

    // Build the Generic modules
    this.usersModule = this.createUsersModule();
    this.notificationsModule = this.createNotificationsModule();
    this.marketingModule = this.createMarketingModule();

    // Build the core modules
    this.membersModule = this.createMembersModule();
    this.postsModule = this.createPostsModule();
    this.commentsModule = this.createCommentsModule();
    this.votesModule = this.createVotesModule();

    this.mountRoutes();
    this.useErrorHandler();
  }

  async stop() {
    await this.webServer.stop();
    await this.eventBus.stop();
  }

  // Get Services
  public getEventBus() {
    return this.eventBus;
  }

  public getWebServer() {
    return this.webServer;
  }

  public getDatabase() {
    if (!this.database) {
      this.database = this.createDatabase();
    }

    return this.database;
  }

  public getContactListAPI() {
    return this.marketingModule.getContactListAPI();
  }

  // Create Services
  private createEventBus() {
    return new InMemoryEventBus();
  }

  private createWebServer() {
    const config = { port: 3000, env: this.config.getEnvironment() };
    return new WebServer(config);
  }

  private createDatabase() {
    return new PrismaDatabase();
  }

  // Create Modules
  private createUsersModule() {
    return UsersModule.build(this.config);
  }

  private createPostsModule() {
    return PostsModule.build(
      this.database,
      this.eventBus,
      this.membersModule.getMembersRepository(),
      this.config,
    );
  }

  private createCommentsModule() {
    return CommentsModule.build(
      this.database,
      this.eventBus,
      this.membersModule.getMembersRepository(),
      this.config,
    );
  }

  private createMembersModule() {
    return MembersModule.build(
      this.database,
      this.eventBus,
      this.config,
    );
  }

  private createVotesModule() {
    return VotesModule.build(
      this.database,
      this.membersModule.getMembersRepository(),
      this.commentsModule.getCommentsRepository(),
      this.postsModule.getPostsRepository(),
      this.eventBus,
      this.config,
    );
  }

  private createMarketingModule() {
    return MarketingModule.build(this.config);
  }

  private createNotificationsModule() {
    return NotificationsModule.build(this.eventBus, this.config);
  }

  // Setup express routes and error handler
  private mountRoutes() {
    this.usersModule.mountRouter(this.webServer);
    this.marketingModule.mountRouter(this.webServer);
    this.membersModule.mountRouter(this.webServer);
    this.postsModule.mountRouter(this.webServer);
    this.votesModule.mountRouter(this.webServer);
    this.commentsModule.mountRouter(this.webServer);
  }

  private useErrorHandler() {
    this.webServer.useErrorHandler(errorHandler);
  }

  public getApplication(): Application {
    return {
      users: this.usersModule.getUsersService(),
      posts: this.postsModule.getPostsService(),
      marketing: this.marketingModule.getMarketingService(),
      notifications:
        this.notificationsModule.getNotificationsService(),
      votes: this.votesModule.getVotesService(),
    };
  }

  public getModule(moduleName: ModuleName) {
    switch (moduleName) {
      case 'members':
        return this.membersModule;
      case 'users':
        return this.usersModule;
      case 'posts':
        return this.postsModule;
      case 'votes':
        return this.votesModule;
      case 'notifications':
        return this.notificationsModule;
      case 'marketing':
        return this.marketingModule;
      default:
        throw new Error(`Module ${moduleName} not found`);
    }
  }

  public getRepositories() {
    return {
      posts: this.postsModule.getPostsRepository(),
      comments: this.commentsModule.getCommentsRepository(),
      members: this.membersModule.getMembersRepository(),
      votes: this.votesModule.getVotesRepository(),
    };
  }
}
