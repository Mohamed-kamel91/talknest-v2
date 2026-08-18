import { SendNotification } from './use-cases/send-notification/send-notification';

import { ITransactionalEmailAPI } from '../external-services/ports/transactional-email-api';
import { SendNotificationCommand } from '../notification-commands';

export class NotificationsService {
  private transactionalEmailApi: ITransactionalEmailAPI;

  constructor(transactionalEmailApi: ITransactionalEmailAPI) {
    this.transactionalEmailApi = transactionalEmailApi;
  }

  public sendNotification(command: SendNotificationCommand) {
    return new SendNotification(this.transactionalEmailApi).execute(
      command,
    );
  }
}
