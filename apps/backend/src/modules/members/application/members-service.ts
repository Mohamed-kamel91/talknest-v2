import { CreateMemberCommand } from '@talknest/api/members';
import { type Result } from '@talknest/core/application';
import { EventBus } from '@talknest/bus';

import {
  CreateMember,
  CreateMemberError,
} from './use-cases/create-member/create-member';
import {
  GetMemberDetails,
  GetMemberDetailsError,
} from './use-cases/get-member-details/get-member-details';
import { Member } from '../domain/member';
import { MembersRepository } from '../repos/ports/members-repository';

export class MemberService {
  constructor(
    private membersRepository: MembersRepository,
    private eventBus: EventBus,
  ) {}

  public createMember(
    command: CreateMemberCommand,
  ): Promise<Result<Member, CreateMemberError>> {
    return new CreateMember(
      this.membersRepository,
      this.eventBus,
    ).execute(command);
  }

  public getMemberDetails(
    userId: string,
  ): Promise<Result<Member, GetMemberDetailsError>> {
    return new GetMemberDetails(this.membersRepository).execute(
      userId,
    );
  }
}
