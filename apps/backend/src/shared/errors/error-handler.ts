import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';

import { FailureAPIResponse } from '@talknest/api';
import { InternalServerError } from '@talknest/errors/server';
import { CustomError, ErrorCode } from '@talknest/errors';

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _: Request,
  res: Response<FailureAPIResponse<ErrorCode>>,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      success: false,
      status: err.status,
      data: null,
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  console.error('--- UNEXPECTED ERROR ---');
  console.error(err);

  const { status, code, message } = new InternalServerError();

  return res.status(status).json({
    success: false,
    status,
    data: null,
    error: {
      code,
      message,
    },
  });
};
