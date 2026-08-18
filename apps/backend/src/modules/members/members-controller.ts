import express from 'express';

import {
  CreateMemberAPIResponse,
  CreateMemberCommand,
} from '@talknest/api/members';

import { MemberService } from './application/members-service';
import { Config } from '../../shared/config';

export class MembersController {
  constructor(
    private memberService: MemberService,
    private config: Config,
  ) {}

  public async createMember(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const commandOrError = CreateMemberCommand.fromRequest(
        req.user,
        req.body,
      );

      if (!commandOrError.isSuccess()) {
        return res.status(401).json({
          success: false,
          error: commandOrError.getError(),
        });
      }

      const result = await this.memberService.createMember(
        commandOrError.getValue(),
      );

      if (result.isSuccess()) {
        return res.status(200).json({
          success: true,
          statusCode: 200,
          data: result.getValue().toDTO(),
        } as CreateMemberAPIResponse);
      } else {
        return res.status(400).json({
          data: null,
          statusCode: 400,
          success: false,
          error: result.getError(),
        } as CreateMemberAPIResponse);
      }
    } catch (err) {
      next(err);
    }
  }
}
