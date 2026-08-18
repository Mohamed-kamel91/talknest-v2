import { type EmailSubscription } from '@talknest/api/marketing';

import { Spy } from '../../../../shared/test-doubles/spy';
import { type IContactListAPI } from '../../ports/contact-list-api';

export class ContactListAPISpy
  extends Spy<IContactListAPI>
  implements IContactListAPI
{
  constructor() {
    super();  
  }

  async addEmailToList(email: string): Promise<EmailSubscription> {
    console.log(
      `ContactListAPISpy: Adding ${email} list... this is for testing & development purposes.`,
    );

    this.addCall('addEmailToList', [email]);

    return { email, subscribed: true };
  }
}
