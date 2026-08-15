import { ErrorType } from './types';

export abstract class CustomError<
  T extends ErrorType = ErrorType,
> extends Error {
  constructor(
    public readonly type: T,
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
