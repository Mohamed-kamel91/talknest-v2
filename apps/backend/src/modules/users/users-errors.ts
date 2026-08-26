import { userErrorCodes } from '@talknest/errors/domain';
import {
  NotFoundError,
  ConflictError,
  BadRequestError,
} from '@talknest/errors/application';

export class UserNotFoundError extends NotFoundError<
  typeof userErrorCodes.USER_NOT_FOUND
> {
  constructor(email?: string) {
    super(
      userErrorCodes.USER_NOT_FOUND,
      email
        ? `User with email: ${email} not found`
        : 'User not found',
    );
  }
}

export class EmailAlreadyTakenError extends ConflictError<
  typeof userErrorCodes.EMAIL_ALREADY_TAKEN
> {
  constructor(email: string) {
    super(
      userErrorCodes.EMAIL_ALREADY_TAKEN,
      `Email: ${email} is already taken`,
    );
  }
}

export class UsernameAlreadyTakenError extends ConflictError<
  typeof userErrorCodes.USERNAME_ALREADY_TAKEN
> {
  constructor(username: string) {
    super(
      userErrorCodes.USERNAME_ALREADY_TAKEN,
      `Username: ${username} is already taken`,
    );
  }
}

export class InvalidUserIdError extends BadRequestError<
  typeof userErrorCodes.INVALID_USER_ID
> {
  constructor() {
    super(userErrorCodes.INVALID_USER_ID, 'User ID is invalid');
  }
}

export class MissingUserIdError extends BadRequestError<
  typeof userErrorCodes.MISSING_USER_ID
> {
  constructor() {
    super(userErrorCodes.MISSING_USER_ID, 'User ID is missing');
  }
}
