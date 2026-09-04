import { randomUUID } from 'node:crypto';

import { DomainEvent } from '@talknest/core';
import { ReputationLevel } from '@talknest/api/members';

export class MemberReputationLevelUpgraded extends DomainEvent {
  constructor(
    public readonly memberId: string,
    public readonly newLevel: ReputationLevel,
    public readonly id: string = randomUUID(),
    public readonly date: Date = new Date(),
  ) {
    super(id, date, 'MemberReputationLevelUpgraded');
  }
}
