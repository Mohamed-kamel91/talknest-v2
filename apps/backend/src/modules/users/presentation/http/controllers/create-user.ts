import express from 'express';
import { randomUUID } from 'node:crypto';

import { CreateUserCommand, UserDTO } from '@talknest/api/users';

import { BaseController } from '../../../../../shared/infra/http';

export class CreateUserController extends BaseController {
  constructor() {
    super();
  }

  async executeImpl(req: express.Request, res: express.Response) {
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

    this.created(res, temporaryUserResponseDTO);
  }
}
