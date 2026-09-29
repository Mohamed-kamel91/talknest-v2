import { type IToDomainMapper } from '@talknest/core/application';
import { MemberReputationLevel as ReputationLevelPersistence } from '@talknest/database';

import { MemberReputationLevel } from '../../domain/member-reputation-level';

class MemberReputationLevelMapper implements IToDomainMapper<
  string,
  MemberReputationLevel
> {
  public toDomain(
    reputationLevel: ReputationLevelPersistence,
  ): MemberReputationLevel {
    return MemberReputationLevel.reconstitute(reputationLevel);
  }
}

export const MemberReputationLevelMap =
  new MemberReputationLevelMapper();
