import { Member } from '../../../members/domain/member';

export class CanCreatePostPolicy {
  public static isAllowed(member: Member): boolean {
    return (
      member.reputationLevel === 'Level2' ||
      member.reputationLevel === 'Level3'
    );
  }
}
