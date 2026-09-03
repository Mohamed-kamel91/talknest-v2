import { type Request, type Response } from 'express';
import { randomUUID } from 'node:crypto';

import { CreateUserCommand, type UserDTO } from '@talknest/api/users';

import { BaseController } from '../../shared/infra/http';

export class UsersController extends BaseController {
  constructor() {
    super();
  }

  public async createUser(req: Request, res: Response) {
    const commandOrError = CreateUserCommand.create(req.body);

    if (commandOrError.isFailure) {
      return this.fail(res, commandOrError.getError());
    }

    const user = commandOrError.getValue();

    const temporaryUserResponseDTO: UserDTO = {
      id: randomUUID(),
      email: user.props.email,
      firstName: user.props.firstName,
      lastName: user.props.lastName,
      username: user.props.username,
    };

    return this.created(res, temporaryUserResponseDTO);
  }
}
