import express from 'express';

import { AddEmailToListCommand } from '@talknest/api/marketing';

import { type MarketingService } from './application/marketing-service';

export class MarketingController {
  constructor(private marketingService: MarketingService) {}

  public addEmailToList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const command = AddEmailToListCommand.fromRequest(req.body);

      const data =
        await this.marketingService.addEmailToList(command);

      return res.status(201).json({
        success: true,
        statusCode: 201,
        error: null,
        data: { subscription: data },
      });
    } catch (error) {
      next(error);
    }
  };
}
