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
export type CommentErrorTypes = ValueOf<typeof commentErrorTypes>;
export type PostErrorTypes = ValueOf<typeof postErrorTypes>;
export type MemberErrorTypes = ValueOf<typeof memberErrorTypes>;

export const userErrorTypes = {
  USERNAME_ALREADY_TAKEN: 'USERNAME_ALREADY_TAKEN',
  EMAIL_ALREADY_TAKEN: 'EMAIL_ALREADY_TAKEN',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_USER_ID: 'INVALID_USER_ID',
  MISSING_USER_ID: 'MISSING_USER_ID',
} as const;

export const commentErrorTypes = {
  COMMENTS_NOT_FOUND: 'COMMENTS_NOT_FOUND',
  COMMENT_NOT_FOUND: 'COMMENT_NOT_FOUND',
  INVALID_COMMENT: 'INVALID_COMMENT',
} as const;

export const postErrorTypes = {
  POST_NOT_FOUND: 'POST_NOT_FOUND',
  POST_CREATION_FORBIDDEN: 'POST_CREATION_FORBIDDEN',
  INVALID_POST_TITLE: 'INVALID_POST_TITLE',
  INVALID_POST_CONTENT: 'INVALID_POST_CONTENT',
  INVALID_POST_LINK: 'INVALID_POST_LINK',
  INVALID_POST_TYPE: 'INVALID_POST_TYPE',
} as const;

export const memberErrorTypes = {
  MEMBER_NOT_FOUND: 'MEMBER_NOT_FOUND',
  INVALID_MEMBER_USERNAME: 'INVALID_MEMBER_USERNAME',
} as const;

export const errorTypes = {
  ...applicationErrorTypes,
  ...serverErrorTypes,
  ...requestErrorTypes,
  ...userErrorTypes,
  ...memberErrorTypes,
  ...commentErrorTypes,
  ...postErrorTypes,
} as const;
