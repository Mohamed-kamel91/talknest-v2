import { CreateUserController } from './create-user';

export class UsersController {
  public createUser(): CreateUserController {
    return new CreateUserController();
  }
}
