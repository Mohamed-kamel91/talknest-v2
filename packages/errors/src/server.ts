import { CustomError } from './custom';
import { ErrorType } from './types';

export type ServerError = InternalServerError | DatabaseError;

export const serverErrorTypes = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
} as const;

export class InternalServerError extends CustomError {
  constructor(
    type: ErrorType = serverErrorTypes.INTERNAL_SERVER_ERROR,
    message: string = 'Something went wrong on our end',
  ) {
    super(type, 500, message);
  }
}

export class DatabaseError extends CustomError {
  constructor(
    type: ErrorType = serverErrorTypes.DATABASE_ERROR,
    message: string = 'A database error occurred',
  ) {
    super(type, 500, message);
  }
}
