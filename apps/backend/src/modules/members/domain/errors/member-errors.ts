import {
  ValidationError,
  NotFoundError,
  ConflictError,
} from '@talknest/errors/application';
import { memberErrorCodes } from '@talknest/errors/domain';

export class InvalidMemberUsernameError extends ValidationError {
  readonly code = memberErrorCodes.INVALID_MEMBER_USERNAME;

  constructor(message: string) {
    super(message);
  }
}

export class MemberAlreadyExistsError extends ConflictError {
  readonly code = memberErrorCodes.MEMBER_ALREADY_EXISTS;

  constructor() {
    super('A member already exists for this user');
  }
}

export class MemberUsernameTakenError extends ConflictError {
  readonly code = memberErrorCodes.MEMBER_USERNAME_TAKEN;

  constructor(username: string) {
    super(`Username "${username}" is already taken`);
  }
}

export class MemberNotFoundError extends NotFoundError {
  readonly code = memberErrorCodes.MEMBER_NOT_FOUND;

  constructor() {
    super('Member not found');
  }
}
