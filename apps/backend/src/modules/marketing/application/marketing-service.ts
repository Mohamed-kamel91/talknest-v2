import {
  AddEmailToListCommand,
  type EmailSubscription,
} from '@talknest/api/marketing';

import { type IContactListAPI } from './ports/contact-list-api';
import { AddEmailToListUseCase } from './use-cases/add-email-to-list/add-email-to-list';

export class MarketingService {
  constructor(private contactListAPI: IContactListAPI) {}

  public addEmailToList(
    command: AddEmailToListCommand,
  ): Promise<EmailSubscription> {
    return new AddEmailToListUseCase(this.contactListAPI).execute(
      command,
    );
  }
}
