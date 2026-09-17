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

export class MemberUsernameTakenError extends ConflictError {
  readonly code = memberErrorCodes.MEMBER_USERNAME_TAKEN;

  constructor(message: string) {
    super(message);
  }
}

export class MemberNotFoundError extends NotFoundError {
  readonly code = memberErrorCodes.MEMBER_NOT_FOUND;

  constructor() {
    super('Member not found');
  }
}
