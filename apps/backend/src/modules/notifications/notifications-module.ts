import { EventBus } from '@talknest/bus';

import { ApplicationModule } from '../../shared/modules/application-module';
import { type Config } from '../../shared/config';

import {
  MailjetTransactionalEmail,
  TransactionalEmailAPISpy,
} from './infra/mail-jet';
import type { ITransactionalEmailAPI } from './application/ports/transactional-email-api';
import { NotificationsService } from './application/notifications-service';
import { NotificationsSubscription } from './application/notification-subscription';

export class NotificationsModule extends ApplicationModule {
  private transactionalEmailApi: ITransactionalEmailAPI;
  private notificationsService: NotificationsService;
  private notificationsSubscriptions: NotificationsSubscription;

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
    return new NotificationsSubscription(
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
