import { type UserDTO } from '@talknest/api/users';

import { type CreateUserCommand } from '../user-command';

export interface IUserRepo {
  save(user: CreateUserCommand): Promise<UserDTO>;
  getByEmail(email: string): Promise<UserDTO | null>;
  getByUsername(username: string): Promise<UserDTO | null>;
}
