import express from 'express';

import { CreateMemberCommand } from '@talknest/api/members';

import { Config } from '../../../../../shared/config';
import { BaseController } from '../../../../../shared/infra/http';
import { MembersService } from '../../../application/members-service';
import { MemberMap } from '../../../application/mappers/member-map';

export class CreateMemberController extends BaseController {
  constructor(
    private membersService: MembersService,
    private config: Config,
  ) {
    super();
  }

  async executeImpl(req: express.Request, res: express.Response) {
    const commandOrError = CreateMemberCommand.create(req.body);

    if (commandOrError.isFailure) {
      return this.fail(res, commandOrError.getError());
    }

    const resultOrError = await this.membersService.createMember(
      commandOrError.getValue(),
    );

    if (resultOrError.isFailure) {
      return this.fail(res, resultOrError.getError());
    }

    this.created(res, MemberMap.toDTO(resultOrError.getValue()));
  }
}
