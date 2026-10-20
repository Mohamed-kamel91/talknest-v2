import { ValidationError } from '@talknest/errors';
import { commentErrorCodes } from '@talknest/errors/domain/comments';

export type CommentBodyValidationError =
  CommentBodyEmptyError | CommentBodyTooLongError;

export class CommentBodyEmptyError extends ValidationError {
  readonly code = commentErrorCodes.COMMENT_BODY_EMPTY;

  constructor() {
    super('Comment body cannot be empty');
  }
}

export class CommentBodyTooLongError extends ValidationError {
  readonly code = commentErrorCodes.COMMENT_BODY_TOO_LONG;

  constructor(maxLength: number) {
    super(`Comment body cannot exceed ${maxLength} characters`);
  }
}
