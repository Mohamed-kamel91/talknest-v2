import { type MemberDTO } from '@talknest/api/members';
import {
  type IToDomainMapper,
  type IToDtoMapper,
  type IToPersistenceMapper,
} from '@talknest/core/application';
import { Member as MemberModel } from '@talknest/database';

import { Member } from '../../domain/member';
import { MemberUsernameMap } from './member-username-map';
import { MemberReputationLevelMap } from './member-reputation-level-map';

type MemberPersistence = Omit<MemberModel, 'createdAt' | 'updatedAt'>;

class MemberMapper
  implements
    IToDomainMapper<MemberModel, Member>,
    IToDtoMapper<Member, MemberDTO>,
    IToPersistenceMapper<Member, MemberPersistence>
{
  public toDomain(persistence: MemberModel): Member {
    return Member.reconstitute({
      id: persistence.id,
      reputationScore: persistence.reputationScore,
      userId: persistence.userId,
      username: MemberUsernameMap.toDomain(persistence.username),
      reputationLevel: MemberReputationLevelMap.toDomain(
        persistence.reputationLevel,
      ),
    });
  }

  public toDTO(member: Member): MemberDTO {
    return {
      userId: member.userId,
      memberId: member.id,
      reputationScore: member.reputationScore,
      username: member.username.value,
      reputationLevel: member.reputationLevel.value,
    };
  }

  public toPersistence(member: Member): MemberPersistence {
    return {
      id: member.id,
      userId: member.userId,
      reputationScore: member.reputationScore,
      username: member.username.value,
      reputationLevel: member.reputationLevel.value,
    };
  }
}

export const MemberMap = new MemberMapper();
