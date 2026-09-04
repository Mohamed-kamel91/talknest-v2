import { Spy } from '../../../../shared/test-doubles/spy';
import {
  ITransactionalEmailAPI,
  SendMailInput,
} from '../../application/ports/transactional-email-api';

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
