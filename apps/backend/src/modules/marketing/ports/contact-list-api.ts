import type { EmailSubscription } from '@talknest/shared/api/marketing';

export interface IContactListAPI {
  addEmailToList(email: string): Promise<EmailSubscription>;
}
