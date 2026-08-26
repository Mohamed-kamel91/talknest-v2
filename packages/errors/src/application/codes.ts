export const applicationErrorCodes = {
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
} as const;

export type ApplicationErrorCode =
  (typeof applicationErrorCodes)[keyof typeof applicationErrorCodes];
