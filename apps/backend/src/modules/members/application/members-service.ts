import { CreateMemberCommand } from '@talknest/api/members';
import { type Result } from '@talknest/core/application';
import { EventBus } from '@talknest/bus';

import {
  CreateMemberUseCase,
  CreateMemberError,
} from './use-cases/create-member/create-member';
import {
  GetMemberDetailsUseCase,
  GetMemberDetailsError,
} from './use-cases/get-member-details/get-member-details';
import { Member } from '../domain/member';
import { IMembersRepository } from './ports/members-repository';

export class MemberService {
  constructor(
    private membersRepository: IMembersRepository,
    private eventBus: EventBus,
  ) {}

  public createMember(
    command: CreateMemberCommand,
  ): Promise<Result<Member, CreateMemberError>> {
    return new CreateMemberUseCase(
      this.membersRepository,
      this.eventBus,
    ).execute(command);
  }

  public getMemberDetails(
    userId: string,
  ): Promise<Result<Member, GetMemberDetailsError>> {
    return new GetMemberDetailsUseCase(
      this.membersRepository,
    ).execute(userId);
  }
}
