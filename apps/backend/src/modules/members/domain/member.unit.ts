import { reputationLevel } from '@talknest/api/members';

import { Member } from './member';
import { MemberUsername } from './member-username';

describe('member', () => {
  it('should start out at level 1 reputation level when created', () => {
    const usernameResult = MemberUsername.create('Billy');
    expect(usernameResult.isSuccess).toBe(true);

    const username = usernameResult.getValue();
    const result = Member.create({
      userId: '8be25ac7-49ff-43be-9f22-3811e268e0bd',
      username,
    });
    expect(result.isSuccess).toBe(true);

    const member = result.getValue();
    expect(member.reputationScore).toBe(0);
    expect(member.reputationLevel.value).toBe(reputationLevel.Level1);
  });
});
