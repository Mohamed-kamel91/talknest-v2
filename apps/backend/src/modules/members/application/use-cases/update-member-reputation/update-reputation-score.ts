import { type IEventBus } from '@talknest/bus';
import { success, fail, type Result, type IUseCase } from '@talknest/core/application';
import { UpdateReputationScoreCommand } from '@talknest/api/members';

import type { IMembersRepository } from '../../ports';
import { MemberNotFoundError } from '../../../domain/errors/member-errors';
import { Member } from '../../../domain/member';

export type UpdateReputationScoreError = MemberNotFoundError;
export type UpdateReputationScoreResponse = Result<Member, UpdateReputationScoreError>;

// Note: This is also something which could be done on a cron job
// We could have a cron job that runs every 24 hours and updates the reputation score of all members using
// the read models. This would be a good way to ensure that the reputation score is always up to date.

export class UpdateReputationScoreUseCase implements IUseCase<
  UpdateReputationScoreCommand,
  UpdateReputationScoreResponse
> {
  constructor(
    private memberRepository: IMembersRepository,
    private eventBus: IEventBus,
  ) {}

  async execute(
    request: UpdateReputationScoreCommand,
  ): Promise<UpdateReputationScoreResponse> {
    const { memberId, scoreChange } = request.props;

    const member = await this.memberRepository.findById(memberId);
    if (!member) {
      return fail(new MemberNotFoundError());
    }

    member.updateReputationScore(scoreChange);

    await this.memberRepository.save(member);
    await this.eventBus.publishEvents(member.getDomainEvents());

    return success(member);
  }
}
