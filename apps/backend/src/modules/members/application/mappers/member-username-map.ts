import { type IToDomainMapper } from '@talknest/core/application';

import { MemberUsername } from '../../domain/member-username';

class MemberUsernameMapper implements IToDomainMapper<
  string,
  MemberUsername
> {
  toDomain(username: string): MemberUsername {
    return MemberUsername.reconstitute(username);
  }
}

export const MemberUsernameMap = new MemberUsernameMapper();
