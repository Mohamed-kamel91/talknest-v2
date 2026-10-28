import { ValidationError, voteErrorCodes } from '@talknest/errors';

export class InvalidVoteStatusError extends ValidationError {
  readonly code = voteErrorCodes.INVALID_VOTE_STATUS;

  constructor(status: string) {
    super(`Invalid vote status: ${status}`);
  }
}
