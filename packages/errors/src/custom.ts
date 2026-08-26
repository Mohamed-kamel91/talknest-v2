import { type ErrorCode } from './error-codes';

export abstract class CustomError<
  T extends ErrorCode = ErrorCode,
> extends Error {
  constructor(
    public readonly code: T,
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
