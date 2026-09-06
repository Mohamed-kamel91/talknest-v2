import express from 'express';

import { AddEmailToListCommand } from '@talknest/api/marketing';

import { BaseController } from '../../../../../shared/infra/http';
import { MarketingService } from '../../../application/marketing-service';

export class AddEmailToListController extends BaseController {
  constructor(private marketingService: MarketingService) {
    super();
  }

  public executeImpl = async (
    req: express.Request,
    res: express.Response,
  ) => {
    const commandOrError = AddEmailToListCommand.create(req.body);

    const subscription = await this.marketingService.addEmailToList(
      commandOrError.getValue(),
    );

    this.created(res, { subscription });
  };
}
