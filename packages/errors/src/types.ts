import { applicationErrorTypes } from './application';
import { requestErrorTypes } from './request';
import { serverErrorTypes } from './server';

export type ValueOf<T> = T[keyof T];

export type ErrorType = ValueOf<typeof errorTypes>;
export type ApplicationErrorTypes = ValueOf<
  typeof applicationErrorTypes
>;
export type ServerErrorType = ValueOf<typeof serverErrorTypes>;
export type RequestErrorType = ValueOf<typeof requestErrorTypes>;
export type UserErrorType = ValueOf<typeof userErrorTypes>;

export const userErrorTypes = {
  USERNAME_ALREADY_TAKEN: 'USERNAME_ALREADY_TAKEN',
  EMAIL_ALREADY_TAKEN: 'EMAIL_ALREADY_TAKEN',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_USER_ID: 'INVALID_USER_ID',
  MISSING_USER_ID: 'MISSING_USER_ID',
} as const;

export const errorTypes = {
  ...applicationErrorTypes,
  ...serverErrorTypes,
  ...requestErrorTypes,
  ...userErrorTypes,
} as const;
