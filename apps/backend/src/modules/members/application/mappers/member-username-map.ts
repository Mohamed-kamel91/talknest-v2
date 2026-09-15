import { type IToDomainMapper } from '@talknest/core/application';

import { MemberUsername } from '../../domain/member-username';

class MemberUsernameMapper implements IToDomainMapper<
  MemberUsername,
  string
> {
  toDomain(username: string): MemberUsername {
    const memberOrError = MemberUsername.create(username);
    return memberOrError.getValue();
  }
}

export const MemberUsernameMap = new MemberUsernameMapper();
