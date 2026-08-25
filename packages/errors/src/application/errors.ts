import { type ErrorCode } from '../error-codes';
import { CustomError } from '../custom';

export type ApplicationError =
  | BadRequestError
  | NotFoundError
  | ConflictError
  | UnauthorizedError
  | ForbiddenError;

export class BadRequestError<
  T extends ErrorCode = ErrorCode,
> extends CustomError<T> {
  constructor(
    code: T = 'BAD_REQUEST' as T,
    message: string = 'The request could not be processed.',
  ) {
    super(code, 400, message);
  }
}

export class NotFoundError<
  T extends ErrorCode = ErrorCode,
> extends CustomError<T> {
  constructor(
    code: T = 'NOT_FOUND' as T,
    message: string = 'The requested resource could not be found.',
  ) {
    super(code, 404, message);
  }
}

export class ConflictError<
  T extends ErrorCode = ErrorCode,
> extends CustomError<T> {
  constructor(
    code: T = 'CONFLICT' as T,
    message: string = 'The request conflicts with the current state of the resource.',
  ) {
    super(code, 409, message);
  }
}

export class UnauthorizedError<
  T extends ErrorCode = ErrorCode,
> extends CustomError<T> {
  constructor(
    code: T = 'UNAUTHORIZED' as T,
    message: string = 'You are not authorized to access this resource.',
  ) {
    super(code, 401, message);
  }
}

export class ForbiddenError<
  T extends ErrorCode = ErrorCode,
> extends CustomError<T> {
  constructor(
    code: T = 'FORBIDDEN' as T,
    message: string = 'You do not have permission to perform this action.',
  ) {
    super(code, 403, message);
  }
}
