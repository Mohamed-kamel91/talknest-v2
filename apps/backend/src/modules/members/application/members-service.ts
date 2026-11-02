import { CreateMemberCommand, UpdateMemberReputationScoreCommand } from '@talknest/api/members';
import { type IEventBus } from '@talknest/bus';

import type { IMembersRepository } from './ports/members-repository';
import { CreateMemberUseCase, CreateMemberResponse } from './use-cases/create-member/create-member';
import {
  GetMemberDetailsUseCase,
  GetMemberDetailsResponse,
} from './use-cases/get-member-details/get-member-details';
import {
  UpdateReputationScoreResponse,
  UpdateReputationScoreUseCase,
} from './use-cases/update-member-reputation/update-reputation-score';

export class MembersService {
  constructor(
    private membersRepository: IMembersRepository,
    private eventBus: IEventBus,
  ) {}

  public createMember(command: CreateMemberCommand): Promise<CreateMemberResponse> {
    return new CreateMemberUseCase(this.membersRepository, this.eventBus).execute(command);
  }

  public getMemberDetails(userId: string): Promise<GetMemberDetailsResponse> {
    return new GetMemberDetailsUseCase(this.membersRepository).execute(userId);
  }

  public updateReputationScore(
    command: UpdateMemberReputationScoreCommand,
  ): Promise<UpdateReputationScoreResponse> {
    return new UpdateReputationScoreUseCase(this.membersRepository, this.eventBus).execute(command);
  }
}
