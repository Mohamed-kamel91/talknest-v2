import { CustomError } from './custom';
import { ErrorType } from './types';

export type ApplicationError =
  | BadRequestError
  | NotFoundError
  | ConflictError
  | UnauthorizedError
  | ForbiddenError;

export const applicationErrorTypes = {
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
} as const;

export class BadRequestError<
  T extends ErrorType = ErrorType,
> extends CustomError<T> {
  constructor(
    type: T,
    message: string = 'The request could not be processed.',
  ) {
    super(type, 400, message);
  }
}

export class NotFoundError<
  T extends ErrorType = ErrorType,
> extends CustomError<T> {
  constructor(
    type: T,
    message: string = 'The requested resource could not be found.',
  ) {
    super(type, 404, message);
  }
}

export class ConflictError<
  T extends ErrorType = ErrorType,
> extends CustomError<T> {
  constructor(
    type: T,
    message: string = 'The request conflicts with the current state of the resource.',
  ) {
    super(type, 409, message);
  }
}

export class UnauthorizedError<
  T extends ErrorType = ErrorType,
> extends CustomError<T> {
  constructor(type: T, message: string = 'Unauthorized access') {
    super(type, 401, message);
  }
}

export class ForbiddenError<
  T extends ErrorType = ErrorType,
> extends CustomError<T> {
  constructor(
    type: T,
    message: string = 'You do not have permission to perform this action.',
  ) {
    super(type, 403, message);
  }
}
