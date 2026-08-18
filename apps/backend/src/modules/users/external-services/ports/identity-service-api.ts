import { User } from '../../domain/user';
import { UserNotFoundError } from '../../users-errors';

export interface IdentityServiceAPI {
  getUserById(userId: string): Promise<User | UserNotFoundError>;
  findUserByEmail(email: string): Promise<User | UserNotFoundError>;
}
