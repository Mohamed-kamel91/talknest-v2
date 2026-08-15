import { userErrorTypes } from '@talknest/errors';
import {
  NotFoundError,
  ConflictError,
  BadRequestError,
} from '@talknest/errors/application';

export class UserNotFoundError extends NotFoundError<
  typeof userErrorTypes.USER_NOT_FOUND
> {
  constructor() {
    super(userErrorTypes.USER_NOT_FOUND, 'User not found');
  }
}

export class EmailAlreadyTakenError extends ConflictError<
  typeof userErrorTypes.USER_NOT_FOUND
> {
  constructor(email: string) {
    super(
      userErrorTypes.USER_NOT_FOUND,
      `Email: ${email} is already taken`,
    );
  }
}

export class UsernameAlreadyTakenError extends ConflictError<
  typeof userErrorTypes.USERNAME_ALREADY_TAKEN
> {
  constructor(username: string) {
    super(
      userErrorTypes.USERNAME_ALREADY_TAKEN,
      `Username: ${username} is already taken`,
    );
  }
}

export class InvalidUserIdError extends BadRequestError<
  typeof userErrorTypes.INVALID_USER_ID
> {
  constructor() {
    super(userErrorTypes.INVALID_USER_ID, 'User ID is invalid');
  }
}
new InvalidUserIdError().type;

export class MissingUserIdError extends BadRequestError<
  typeof userErrorTypes.MISSING_USER_ID
> {
  constructor() {
    super(userErrorTypes.MISSING_USER_ID, 'User ID is missing');
  }
}
