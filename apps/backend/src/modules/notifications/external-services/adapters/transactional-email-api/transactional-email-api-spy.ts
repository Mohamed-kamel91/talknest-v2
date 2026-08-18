import {
  SendMailInput,
  ITransactionalEmailAPI,
} from '../../ports/transactional-email-api';
import { Spy } from '../../../../../shared/test-doubles/spy';

export class TransactionalEmailAPISpy
  extends Spy<ITransactionalEmailAPI>
  implements ITransactionalEmailAPI
{
  constructor() {
    super();
  }

  public async sendMail(input: SendMailInput): Promise<boolean> {
    this.addCall('sendMail', [input]);
    return true;
  }
}
