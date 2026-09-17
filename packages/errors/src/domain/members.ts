export const memberErrorCodes = {
  MEMBER_NOT_FOUND: 'MEMBER_NOT_FOUND',
  INVALID_MEMBER_USERNAME: 'INVALID_MEMBER_USERNAME',
  INSUFFICIENT_MEMBER_LEVEL: 'INSUFFICIENT_MEMBER_LEVEL',
  MEMBER_USERNAME_TAKEN: 'MEMBER_USERNAME_TAKEN',
} as const;

export type MemberErrorCode =
  (typeof memberErrorCodes)[keyof typeof memberErrorCodes];

export type MemberErrorCodes = {
  [K in keyof typeof memberErrorCodes]: (typeof memberErrorCodes)[K];
};
