import { userErrorCodes } from '@talknest/errors/domain';
import {
  NotFoundError,
  ConflictError,
  ValidationError,
} from '@talknest/errors/application';

export class UserNotFoundError extends NotFoundError {
  readonly code = userErrorCodes.USER_NOT_FOUND;

  constructor(email?: string) {
    super(
      email
        ? `User with email: ${email} not found`
        : 'User not found',
    );
  }
}

export class EmailAlreadyTakenError extends ConflictError {
  readonly code = userErrorCodes.EMAIL_ALREADY_TAKEN;

  constructor(email: string) {
    super(`Email: ${email} is already taken`);
  }
}

export class UsernameAlreadyTakenError extends ConflictError {
  readonly code = userErrorCodes.USERNAME_ALREADY_TAKEN;

  constructor(username: string) {
    super(`Username: ${username} is already taken`);
  }
}

export class InvalidUserIdError extends ValidationError {
  readonly code = userErrorCodes.INVALID_USER_ID;

  constructor() {
    super('User ID is invalid');
  }
}

export class MissingUserIdError extends ValidationError {
  readonly code = userErrorCodes.MISSING_USER_ID;

  constructor() {
    super('User ID is missing');
  }
}
