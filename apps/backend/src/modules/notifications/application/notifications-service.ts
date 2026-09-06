import {
  SendNotificationResponse,
  SendNotificationUseCase,
} from './use-cases/send-notification/send-notification';
import type { ITransactionalEmailAPI } from './ports/transactional-email-api';
import { SendNotificationCommand } from '../notification-commands';

export class NotificationsService {
  private transactionalEmailApi: ITransactionalEmailAPI;

  constructor(transactionalEmailApi: ITransactionalEmailAPI) {
    this.transactionalEmailApi = transactionalEmailApi;
  }

  public sendNotification(
    command: SendNotificationCommand,
  ): Promise<SendNotificationResponse> {
    return new SendNotificationUseCase(
      this.transactionalEmailApi,
    ).execute(command);
  }
}
