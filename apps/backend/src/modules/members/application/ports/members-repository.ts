import { Member } from '../../domain/member';

export interface IMembersRepository {
  getByUsername(username: string): Promise<Member | null>;
  getByUserId(userId: string): Promise<Member | null>;
  getById(memberId: string): Promise<Member | null>;
  save(member: Member): Promise<void>;
}
