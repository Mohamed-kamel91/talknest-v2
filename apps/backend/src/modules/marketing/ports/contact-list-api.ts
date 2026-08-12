import { type EmailSubscription } from '@talknest/api/marketing';

export interface IContactListAPI {
  addEmailToList(email: string): Promise<EmailSubscription>;
}
