import type { IContactListAPI } from './ports/contact-list-api';
import { MailchimpContactList } from './adapters/contact-list-api/mail-chimp-contact-list';
import { ContactListAPISpy } from './adapters/contact-list-api/contact-list-api-spy';
import { MarketingService } from './application/marketing-service';
import { MarketingController } from './marketing-controller';
import { MarketingRouter } from './marketing-router';

import { type Config } from '../../shared/config';
import { ApplicationModule } from '../../shared/modules/application-module';
import { WebServer } from '../../shared/http';

export class MarketingModule extends ApplicationModule {
  private contactListAPI: IContactListAPI;
  private marketingService: MarketingService;
  private marketingController: MarketingController;
  private marketingRouter: MarketingRouter;

  private constructor(config: Config) {
    super(config);

    this.contactListAPI = this.createContactListAPI();
    this.marketingService = this.createMarketingService();
    this.marketingController = this.createMarketingController();
    this.marketingRouter = this.createMarketingRouter();

    this.setupRoutes();
  }

  static build(config: Config) {
    return new MarketingModule(config);
  }

  public getContactListAPI() {
    return this.contactListAPI;
  }

  public getMarketingService() {
    return this.marketingService;
  }

  public getMarketingController() {
    return this.marketingController;
  }

  public mountRouter(webServer: WebServer) {
    const path = this.marketingRouter.basePath;
    const router = this.marketingRouter.getRouter();
    webServer.mountRouter(path, router);
  }

  private createContactListAPI() {
    if (this.config.getScript() === 'test:unit') {
      return new ContactListAPISpy();
    }

    return new MailchimpContactList();
  }

  private createMarketingService() {
    return new MarketingService(this.contactListAPI);
  }

  private createMarketingController() {
    return new MarketingController(this.marketingService);
  }

  private setupRoutes() {
    this.marketingRouter.register();
  }

  private createMarketingRouter() {
    return new MarketingRouter(this.marketingController);
  }
}
