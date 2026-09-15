import {
  type MemberDTO,
  type ReputationLevel,
} from '@talknest/api/members';
import {
  type IToDomainMapper,
  type IToDtoMapper,
  type IToPersistenceMapper,
} from '@talknest/core/application';
import { Member as MemberModel } from '@talknest/database';

import { Member } from '../../domain/member';
import { MemberUsernameMap } from './member-username-map';

type MemberPersistence = Omit<
  MemberModel,
  'dateCreated' | 'lastUpdated'
>;

class MemberMapper
  implements
    IToDomainMapper<Member, MemberPersistence>,
    IToDtoMapper<Member, MemberDTO>,
    IToPersistenceMapper<Member, MemberPersistence>
{
  toDomain(persistence: MemberModel): Member {
    return Member.reconstitute({
      id: persistence.id,
      reputationScore: persistence.reputationScore,
      userId: persistence.userId,
      username: MemberUsernameMap.toDomain(persistence.username),
      reputationLevel: persistence.reputationLevel as ReputationLevel,
    });
  }

  toDTO(domain: Member): MemberDTO {
    return {
      userId: domain.userId,
      memberId: domain.id,
      username: domain.username.value,
      reputationLevel: domain.reputationLevel,
      reputationScore: domain.reputationScore,
    };
  }

  toPersistence(domain: Member): MemberPersistence {
    return {
      id: domain.id,
      userId: domain.userId,
      username: domain.username.value,
      reputationScore: domain.reputationScore,
      reputationLevel: domain.reputationLevel,
    };
  }
}

export const MemberMap = new MemberMapper();
