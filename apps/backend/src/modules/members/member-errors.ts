import {
  BadRequestError,
  NotFoundError,
} from '@talknest/errors/application';
import { memberErrorCodes } from '@talknest/errors/domain';

export class InvalidMemberUsernameError extends BadRequestError<
  typeof memberErrorCodes.INVALID_MEMBER_USERNAME
> {
  constructor() {
    super(
      memberErrorCodes.INVALID_MEMBER_USERNAME,
      'Member username is invalid',
    );
  }
}

export class MemberNotFoundError extends NotFoundError<
  typeof memberErrorCodes.MEMBER_NOT_FOUND
> {
  constructor() {
    super(memberErrorCodes.MEMBER_NOT_FOUND, 'Member not found');
  }
}
