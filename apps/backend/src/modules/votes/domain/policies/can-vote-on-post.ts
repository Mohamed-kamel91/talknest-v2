import { success, type Result } from '@talknest/core/application';

import { InsufficientMemberLevelError } from '../../../members/domain/errors/member-errors';

import { Member } from '../../../members/domain/member';
import { Post } from '../../../posts/domain/post';

export class CanVoteOnPostPolicy {
  public static check(member: Member, post: Post): Result<void, InsufficientMemberLevelError> {
    if (post.isAuthoredBy(member.id)) {
      return success(undefined);
    }

    return member.reputationLevelAtLeast('Level2');
  }
}
