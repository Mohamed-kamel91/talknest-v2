import { DomainEvent } from '@talknest/core';

import { type ReputationLevel } from '@talknest/api/members';

type MemberReputationLevelUpgradedData = {
  memberId: string;
  newLevel: ReputationLevel;
};

export class MemberReputationLevelUpgraded extends DomainEvent<MemberReputationLevelUpgradedData> {
  static readonly eventName = 'MemberReputationLevelUpgraded';

  constructor(data: MemberReputationLevelUpgradedData) {
    super(
      MemberReputationLevelUpgraded.eventName,
      data.memberId,
      data,
    );
  }
}
