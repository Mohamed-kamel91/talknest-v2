import {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import { randomUUID } from 'node:crypto';

import {
  CreateUserCommand,
  CreateUserAPIResponse,
  UserDTO,
} from '@talknest/api/users';

export class UsersController {
  constructor() {}

  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const command = CreateUserCommand.fromRequest(req.body);

      if (!command.isSuccess()) {
        return next(command.getError());
      }

      const commandValue = command.getValue();

      const temporaryUserResponseDTO: UserDTO = {
        id: randomUUID(),
        email: commandValue.email,
        firstName: commandValue.firstName,
        lastName: commandValue.lastName,
        username: commandValue.username,
      };

      const response: CreateUserAPIResponse = {
        success: true,
        statusCode: 201,
        data: temporaryUserResponseDTO,
        error: null,
      };

      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
