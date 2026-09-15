import { MembersService } from '../../../application/members-service';
import { Config } from '../../../../../shared/config';

import { CreateMemberController } from './create-member';

export class MembersController {
  constructor(
    private memberService: MembersService,
    private config: Config,
  ) {}

  public createMember(): CreateMemberController {
    return new CreateMemberController(
      this.memberService,
      this.config,
    );
  }
}
