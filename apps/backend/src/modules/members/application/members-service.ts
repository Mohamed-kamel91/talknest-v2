import { CreateMemberCommand } from '@talknest/api/members';
import { EventBus } from '@talknest/bus';

import type { IMembersRepository } from './ports/members-repository';
import {
  CreateMemberUseCase,
  CreateMemberResonse,
} from './use-cases/create-member/create-member';
import {
  GetMemberDetailsUseCase,
  GetMemberDetailsResponse,
} from './use-cases/get-member-details/get-member-details';

export class MemberService {
  constructor(
    private membersRepository: IMembersRepository,
    private eventBus: EventBus,
  ) {}

  public createMember(
    command: CreateMemberCommand,
  ): Promise<CreateMemberResonse> {
    return new CreateMemberUseCase(
      this.membersRepository,
      this.eventBus,
    ).execute(command);
  }

  public getMemberDetails(
    userId: string,
  ): Promise<GetMemberDetailsResponse> {
    return new GetMemberDetailsUseCase(
      this.membersRepository,
    ).execute(userId);
  }
}
