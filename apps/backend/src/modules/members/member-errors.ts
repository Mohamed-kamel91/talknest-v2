import {
  BadRequestError,
  NotFoundError,
} from '@talknest/errors/application';
import { memberErrorTypes } from '@talknest/errors/types';

export class InvalidMemberUsernameError extends BadRequestError<
  typeof memberErrorTypes.INVALID_MEMBER_USERNAME
> {
  constructor() {
    super(
      memberErrorTypes.INVALID_MEMBER_USERNAME,
      'Member username is invalid',
    );
  }
}

export class MemberNotFoundError extends NotFoundError<
  typeof memberErrorTypes.MEMBER_NOT_FOUND
> {
  constructor() {
    super(memberErrorTypes.MEMBER_NOT_FOUND, 'Member not found');
  }
}
