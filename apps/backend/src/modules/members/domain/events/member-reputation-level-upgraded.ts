import { DomainEvent } from '@talknest/core';
import { type ReputationLevel } from '@talknest/api/members';

type MemberReputationLevelUpgradedData = {
  memberId: string;
  newLevel: string;
};

export class MemberReputationLevelUpgraded extends DomainEvent<MemberReputationLevelUpgradedData> {
  static readonly eventName: string = 'MemberReputationLevelUpgraded';

  constructor(memberId: string, newLevel: ReputationLevel) {
    super(MemberReputationLevelUpgraded.eventName, memberId, {
      memberId,
      newLevel,
    });
  }
}
