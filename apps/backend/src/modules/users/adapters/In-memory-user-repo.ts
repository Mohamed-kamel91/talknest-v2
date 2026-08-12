import { type UserDTO } from '@talknest/api/users';

import { type CreateUserCommand } from '../user-command';
import { type IUserRepo } from '../ports/user-repo';
import { Spy } from '../../../shared/test-doubles/spy';

export class InMemoryUserRepo
  extends Spy<IUserRepo>
  implements IUserRepo
{
  private users: UserDTO[];
  private nextId = 1;

  constructor() {
    super();
    this.users = [];
  }

  public save(user: CreateUserCommand): Promise<UserDTO> {
    const { email, firstName, lastName, username, password } = user;

    this.addCall('save', [user]);

    const newUser = {
      id: this.nextId++,
      email,
      firstName,
      lastName,
      username,
      password,
    };

    this.users.push(newUser);

    const { password: _, ...safeUser } = newUser;

    return Promise.resolve({ ...safeUser });
  }

  public getById(id: number): Promise<UserDTO | null> {
    return Promise.resolve(
      this.users.find((user) => user.id === id) || null,
    );
  }

  public delete(email: string): Promise<void> {
    const index = this.users.findIndex(
      (user) => user.email === email,
    );

    if (index !== -1) {
      this.users.splice(index, 1);
    }

    return Promise.resolve();
  }

  public update(
    id: number,
    props: Partial<CreateUserCommand['props']>,
  ): Promise<UserDTO | null> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      const existingUser = this.users[userIndex]!;

      this.users[userIndex] = {
        ...existingUser,
        ...props,
      };

      return Promise.resolve(this.users[userIndex]);
    }

    return Promise.resolve(null);
  }

  public getByEmail(email: string): Promise<UserDTO | null> {
    return Promise.resolve(
      this.users.find((user) => user.email === email) || null,
    );
  }

  public getByUsername(username: string): Promise<UserDTO | null> {
    return Promise.resolve(
      this.users.find((user) => user.username === username) || null,
    );
  }

  public async reset() {
    this.users = [];
    this.calls = [];
  }
}
