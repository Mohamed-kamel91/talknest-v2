import { CustomError, errorCategories } from '../custom';

export type FieldError = {
  field: string;
  message: string;
};

export type ApplicationError =
  | ValidationError
  | NotFoundError
  | ConflictError
  | UnauthorizedError
  | ForbiddenError;

export abstract class ValidationError extends CustomError {
  readonly category = errorCategories.VALIDATION;

  constructor(
    message: string,
    readonly fieldErrors?: FieldError[],
  ) {
    super(message);
  }
}

export abstract class NotFoundError extends CustomError {
  readonly category = errorCategories.NOT_FOUND;

  constructor(message: string) {
    super(message);
  }
}

export abstract class ConflictError extends CustomError {
  readonly category = errorCategories.CONFLICT;

  constructor(message: string) {
    super(message);
  }
}

export abstract class UnauthorizedError extends CustomError {
  readonly category = errorCategories.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
  }
}

export abstract class ForbiddenError extends CustomError {
  readonly category = errorCategories.FORBIDDEN;

  constructor(message: string) {
    super(message);
  }
}
