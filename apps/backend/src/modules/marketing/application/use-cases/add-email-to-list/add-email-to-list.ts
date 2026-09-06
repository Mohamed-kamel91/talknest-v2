import {
  type AddEmailToListCommand,
  type EmailSubscription,
} from '@talknest/api/marketing';

import { IContactListAPI } from '../../ports/contact-list-api';

export class AddEmailToListUseCase {
  constructor(private contactListAPI: IContactListAPI) {}

  async execute(
    command: AddEmailToListCommand,
  ): Promise<EmailSubscription> {
    const { email } = command.props;

    const result = await this.contactListAPI.addEmailToList(email);

    return result;
  }
}
