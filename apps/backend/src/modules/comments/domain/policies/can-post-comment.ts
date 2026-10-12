import { ReputationLevel } from '@talknest/api/members';

import { Member } from '../../../members/domain/member';

export class CanPostCommentPolicy {
  private static readonly MIN_LEVEL: ReputationLevel = 'Level1';

  public static isAllowed(member: Member): boolean {
    return member.isReputationLevelAtLeast(
      CanPostCommentPolicy.MIN_LEVEL,
    );
  }
}
