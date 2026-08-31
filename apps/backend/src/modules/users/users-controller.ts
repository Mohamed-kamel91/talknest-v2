import { type Request, type Response } from 'express';
import { randomUUID } from 'node:crypto';

import {
  CreateUserCommand,
  CreateUserAPIResponse,
  UserDTO,
} from '@talknest/api/users';

import { BaseController } from '../../shared/infra/http';

export class UsersController extends BaseController {
  constructor() {
    super();
  }

  public async createUser(req: Request, res: Response) {
    const command = CreateUserCommand.fromRequest(req.body);

    if (command.isFailure()) {
      return this.fail(res, command.getError());
    }

    const user = command.getValue();

    const temporaryUserResponseDTO: UserDTO = {
      id: randomUUID(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    };

    return this.created(res, temporaryUserResponseDTO);
  }
}
