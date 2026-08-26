import { applicationErrorCodes } from './application';
import { requestErrorCodes } from './request';
import { serverErrorCodes } from './server';
import {
  commentErrorCodes,
  memberErrorCodes,
  postErrorCodes,
  userErrorCodes,
} from './domain';

export const errorCodes = {
  ...applicationErrorCodes,
  ...requestErrorCodes,
  ...serverErrorCodes,
  ...userErrorCodes,
  ...memberErrorCodes,
  ...commentErrorCodes,
  ...postErrorCodes,
} as const;

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes];
