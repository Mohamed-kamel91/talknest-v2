import { Result, UseCase } from '@talknest/core/application';
import { NotFoundError } from '@talknest/errors/application';

import { SendNotificationCommand } from '../../../notification-commands';
import { ITransactionalEmailAPI } from '../../../external-services/ports/transactional-email-api';

type SendNotificationError = NotFoundError;

export class SendNotification implements UseCase<
  SendNotificationCommand,
  Result<void, SendNotificationError>
> {
  constructor(transactionalEmailApi: ITransactionalEmailAPI) {}

  async execute(
    request: SendNotificationCommand,
  ): Promise<Result<void, SendNotificationError>> {
    // No need to implement. For demonstration purposes only. A mature approach would be to
    // queue a notification and process it later (see the RDD-First approach to event queuing).
    console.log('SendNotification -> Not yet implemented');
    return Result.success(undefined);
  }
}
