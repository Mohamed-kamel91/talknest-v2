import { EventBus } from '@talknest/bus';

import { ApplicationModule } from '../../shared/modules/application-module';
import { NotificationsService } from './application/notifications-service';
import { NotificationsSubscriptions } from './application/notification-subscriptions';
import type { ITransactionalEmailAPI } from './external-services/ports/transactional-email-api';
import { TransactionalEmailAPISpy } from './external-services/adapters/transactional-email-api/transactional-email-api-spy';
import { MailjetTransactionalEmail } from './external-services/adapters/transactional-email-api/mailjet-transactional-email-api';

import { type Config } from '../../shared/config';

export class NotificationsModule extends ApplicationModule {
  private transactionalEmailApi: ITransactionalEmailAPI;
  private notificationsService: NotificationsService;
  private notificationsSubscriptions: NotificationsSubscriptions;

  private constructor(
    private eventBus: EventBus,
    config: Config,
  ) {
    super(config);

    this.transactionalEmailApi = this.createTransactionalEmailAPI();
    this.notificationsService = this.createNotificationsService();
    this.notificationsSubscriptions =
      this.createNotificationSubscriptions();
  }

  static build(eventBus: EventBus, config: Config) {
    return new NotificationsModule(eventBus, config);
  }

  public getNotificationsService() {
    return this.notificationsService;
  }

  public getTransactionalEmailApi() {
    return this.transactionalEmailApi;
  }

  private createNotificationSubscriptions() {
    return new NotificationsSubscriptions(
      this.eventBus,
      this.notificationsService,
    );
  }

  private createNotificationsService() {
    return new NotificationsService(this.transactionalEmailApi);
  }

  private createTransactionalEmailAPI() {
    if (this.config.getScript() === 'test:unit') {
      return new TransactionalEmailAPISpy();
    }

    return new MailjetTransactionalEmail();
  }
}
