import { type ErrorCode } from '../error-codes';
import { CustomError } from '../custom';
import { serverErrorCodes } from './codes';

export type ServerError = InternalServerError | DatabaseError;

export class InternalServerError extends CustomError {
  constructor(
    code: ErrorCode = serverErrorCodes.INTERNAL_SERVER_ERROR,
    message: string = 'Something went wrong on our end',
  ) {
    super(code, 500, message);
  }
}

export class DatabaseError extends CustomError {
  constructor(
    code: ErrorCode = serverErrorCodes.DATABASE_ERROR,
    message: string = 'A database error occurred',
  ) {
    super(code, 500, message);
  }
}
