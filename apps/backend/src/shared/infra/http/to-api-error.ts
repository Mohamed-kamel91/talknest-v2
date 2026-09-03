import { APIError } from '@talknest/api';
import {
  CustomError,
  ErrorCode,
  ValidationError,
} from '@talknest/errors';

export const toApiError = (
  error: CustomError,
): APIError<ErrorCode> => {
  if (error instanceof ValidationError) {
    return {
      code: error.code,
      message: error.message,
      fields: error.fieldErrors ?? [],
    } as APIError<ErrorCode>;
  }

  return {
    code: error.code,
    message: error.message,
  } as APIError<ErrorCode>;
};
