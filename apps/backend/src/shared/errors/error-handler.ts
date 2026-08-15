import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';

import { FailureResponse } from '@talknest/api';
import { InternalServerError } from '@talknest/errors/server';
import { CustomError } from '@talknest/errors/custom';
import { ErrorType } from '@talknest/errors/types';

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response<FailureResponse<ErrorType>>,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.code).json({
      success: false,
      data: null,
      error: {
        type: err.type,
        code: err.code,
        message: err.message,
      },
    });
  }

  console.error('--- UNEXPECTED ERROR ---');
  console.error(err);

  const internalServerError = new InternalServerError();

  return res.status(internalServerError.code).json({
    success: false,
    data: null,
    error: {
      type: internalServerError.type,
      code: internalServerError.code,
      message: internalServerError.message,
    },
  });
};
