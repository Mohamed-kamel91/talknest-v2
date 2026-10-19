import { MembersService } from '../../../application/members-service';
import { CreateMemberController } from './create-member';

export class MembersController {
  constructor(private memberService: MembersService) {}

  public createMember(): CreateMemberController {
    return new CreateMemberController(this.memberService);
  }
}
