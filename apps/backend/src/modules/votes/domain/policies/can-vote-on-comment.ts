import { success, type Result } from '@talknest/core/application';

import { InsufficientMemberLevelError } from '../../../members/domain/errors/member-errors';

import { Comment } from '../../../comments/domain/comment';
import { Member } from '../../../members/domain/member';

export class CanVoteOnCommentPolicy {
  public static check(
    member: Member,
    comment: Comment,
  ): Result<void, InsufficientMemberLevelError> {
    if (comment.isAuthoredBy(member.id)) {
      return success(undefined);
    }

    return member.reputationLevelAtLeast('Level2');
  }
}
