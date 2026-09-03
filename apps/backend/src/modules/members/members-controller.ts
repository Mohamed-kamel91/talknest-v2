import express from 'express';

import { CreateMemberCommand } from '@talknest/api/members';

import { MemberService } from './application/members-service';
import { Config } from '../../shared/config';
import { BaseController } from '../../shared/infra/http';

export class MembersController extends BaseController {
  constructor(
    private memberService: MemberService,
    private config: Config,
  ) {
    super();
  }

  public async createMember(
    req: express.Request,
    res: express.Response,
  ) {
    const commandOrError = CreateMemberCommand.create(req.body);

    if (commandOrError.isFailure) {
      return this.fail(res, commandOrError.getError());
    }

    const result = await this.memberService.createMember(
      commandOrError.getValue(),
    );

    if (result.isFailure) {
      return this.fail(res, result.getError());
    }

    return this.created(res, result.getValue());
  }
}
