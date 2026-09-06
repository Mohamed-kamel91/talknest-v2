import { User } from '../../domain/user';
import { UserNotFoundError } from '../../domain/errors/users-errors';

export interface IdentityServiceAPI {
  getUserById(userId: string): Promise<User | UserNotFoundError>;
  findUserByEmail(email: string): Promise<User | UserNotFoundError>;
}
