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
  _: Request,
  res: Response<FailureResponse<ErrorType>>,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      data: null,
      error: {
        type: err.type,
        message: err.message,
      },
    });
  }

  console.error('--- UNEXPECTED ERROR ---');
  console.error(err);

  const { statusCode, type, message } = new InternalServerError();

  return res.status(statusCode).json({
    success: false,
    statusCode,
    data: null,
    error: {
      type,
      message,
    },
  });
};
