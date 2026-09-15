import { Spy } from '../../../../shared/test-doubles/spy';
import { IMembersRepository } from '../../application/ports/members-repository';
import { Member } from '../../domain/member';

export class InMemoryMembersRepository
  extends Spy<IMembersRepository>
  implements IMembersRepository
{
  private members: Member[] = [];

  async getByUsername(username: string): Promise<Member | null> {
    this.addCall('getByUsername', [username]);

    const found = this.members.find(
      (member) => member.username.value === username,
    );

    return found ?? null;
  }

  async getByUserId(userId: string): Promise<Member | null> {
    this.addCall('getByUserId', [userId]);

    const found = this.members.find(
      (member) => member.userId === userId,
    );

    return found ?? null;
  }

  async getById(memberId: string): Promise<Member | null> {
    this.addCall('getById', [memberId]);

    const found = this.members.find(
      (member) => member.id === memberId,
    );

    return found ?? null;
  }

  async save(member: Member): Promise<void> {
    this.addCall('save', [member]);

    const existingIndex = this.members.findIndex(
      (existing) => existing.id === member.id,
    );

    if (existingIndex !== -1) {
      this.members[existingIndex] = member; // upsert: update
    } else {
      this.members.push(member); // upsert: insert
    }
  }

  public getAll(): Member[] {
    return [...this.members];
  }

  public seed(members: Member[]): void {
    this.members.push(...members);
  }

  public override reset(): void {
    super.reset();
    this.members = [];
  }
}
