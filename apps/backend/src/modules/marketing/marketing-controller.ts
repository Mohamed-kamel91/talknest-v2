import express from 'express';

import { AddEmailToListCommand } from '@talknest/api/marketing';

import { type MarketingService } from './application/marketing-service';
import { BaseController } from '../../shared/infra/http';

export class MarketingController extends BaseController {
  constructor(private marketingService: MarketingService) {
    super();
  }

  public addEmailToList = async (
    req: express.Request,
    res: express.Response,
  ) => {
    const command = AddEmailToListCommand.fromRequest(req.body);

    const result =
      await this.marketingService.addEmailToList(command);

    return this.created(res, { subscription: result });
  };
}
