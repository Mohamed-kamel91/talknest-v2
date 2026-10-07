export const postErrorCodes = {
  POST_NOT_FOUND: 'POST_NOT_FOUND',

  INVALID_POST_TITLE: 'INVALID_POST_TITLE',
  INVALID_POST_CONTENT: 'INVALID_POST_CONTENT',
  INVALID_POST_LINK: 'INVALID_POST_LINK',
  INVALID_POST_TYPE: 'INVALID_POST_TYPE',

  INVALID_TEXT_POST: 'INVALID_TEXT_POST',
  INVALID_LINK_POST: 'INVALID_LINK_POST',
} as const;

export type PostErrorCode =
  (typeof postErrorCodes)[keyof typeof postErrorCodes];

export type PostErrorCodes = {
  [K in keyof typeof postErrorCodes]: (typeof postErrorCodes)[K];
};
