import { type Result } from '@talknest/core/application';

import { InsufficientMemberLevelError } from '../../../members/domain/errors/member-errors';
import { Member } from '../../../members/domain/member';

export class CanCreatePostPolicy {
  public static check(member: Member): Result<void, InsufficientMemberLevelError> {
    return member.reputationLevelAtLeast('Level2');
  }
}
