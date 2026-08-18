import { userErrorTypes } from '@talknest/errors/types';
import {
  NotFoundError,
  ConflictError,
  BadRequestError,
} from '@talknest/errors/application';

export class UserNotFoundError extends NotFoundError<
  typeof userErrorTypes.USER_NOT_FOUND
> {
  constructor(email?: string) {
    super(
      userErrorTypes.USER_NOT_FOUND,
      email
        ? 'User with email: ${email} not found'
        : 'User not found',
    );
  }
}

export class EmailAlreadyTakenError extends ConflictError<
  typeof userErrorTypes.EMAIL_ALREADY_TAKEN
> {
  constructor(email: string) {
    super(
      userErrorTypes.EMAIL_ALREADY_TAKEN,
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

export class MissingUserIdError extends BadRequestError<
  typeof userErrorTypes.MISSING_USER_ID
> {
  constructor() {
    super(userErrorTypes.MISSING_USER_ID, 'User ID is missing');
  }
}
