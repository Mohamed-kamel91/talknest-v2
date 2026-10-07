import { ReputationLevel } from '@talknest/api';
import { Member } from '../../../members/domain/member';

export class CanCreatePostPolicy {
  private static readonly MIN_LEVEL: ReputationLevel = 'Level2';

  public static isAllowed(member: Member): boolean {
    return member.isReputationLevelAtLeast(
      CanCreatePostPolicy.MIN_LEVEL,
    );
  }
}
