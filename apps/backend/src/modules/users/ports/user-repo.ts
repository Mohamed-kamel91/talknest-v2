import type { User } from '@talknest/api/user';
import type { CreateUserCommand } from '../user-command';

export interface IUserRepo {
  save(user: CreateUserCommand): Promise<User>;
  getByEmail(email: string): Promise<User | null>;
  getByUsername(username: string): Promise<User | null>;
}
