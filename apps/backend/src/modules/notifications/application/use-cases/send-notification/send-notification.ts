import {
  success,
  type Result,
  type IUseCase,
} from '@talknest/core/application';
import { NotFoundError } from '@talknest/errors/application';

import { SendNotificationCommand } from '../../../notification-commands';
import type { ITransactionalEmailAPI } from '../../ports/transactional-email-api';

export type SendNotificationError = NotFoundError;
export type SendNotificationResponse = Result<
  void,
  SendNotificationError
>;

export class SendNotificationUseCase implements IUseCase<
  SendNotificationCommand,
  SendNotificationResponse
> {
  constructor(transactionalEmailApi: ITransactionalEmailAPI) {}

  async execute(
    request: SendNotificationCommand,
  ): Promise<SendNotificationResponse> {
    // No need to implement. For demonstration purposes only. A mature approach would be to
    // queue a notification and process it later (see the RDD-First approach to event queuing).
    console.log('SendNotification -> Not yet implemented');
    return success(undefined);
  }
}
