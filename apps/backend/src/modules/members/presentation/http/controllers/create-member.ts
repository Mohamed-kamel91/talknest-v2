import express from 'express';

import { CreateMemberCommand } from '@talknest/api/members';

import { Config } from '../../../../../shared/config';
import { BaseController } from '../../../../../shared/infra/http';
import { MemberService } from '../../../application/members-service';

export class CreateMemberController extends BaseController {
  constructor(
    private memberService: MemberService,
    private config: Config,
  ) {
    super();
  }

  async executeImpl(req: express.Request, res: express.Response) {
    const commandOrError = CreateMemberCommand.create(req.body);

    if (commandOrError.isFailure) {
      return this.fail(res, commandOrError.getError());
    }

    const resultOrError = await this.memberService.createMember(
      commandOrError.getValue(),
    );

    if (resultOrError.isFailure) {
      return this.fail(res, resultOrError.getError());
    }

    this.created(res, resultOrError.getValue());
  }
}
