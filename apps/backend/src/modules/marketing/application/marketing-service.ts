import {
  AddEmailToListCommand,
  type EmailSubscription,
} from '@talknest/api/marketing';

import { type IContactListAPI } from '../ports/contact-list-api';

export class MarketingService {
  constructor(private contactListAPI: IContactListAPI) {}

  public async addEmailToList(
    command: AddEmailToListCommand,
  ): Promise<EmailSubscription> {
    const result = await this.contactListAPI.addEmailToList(
      command.email,
    );

    return result;
  }
}
