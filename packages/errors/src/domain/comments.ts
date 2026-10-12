export const commentErrorCodes = {
  COMMENTS_NOT_FOUND: 'COMMENTS_NOT_FOUND',
  COMMENT_NOT_FOUND: 'COMMENT_NOT_FOUND',
  COMMENT_BODY_EMPTY: 'COMMENT_BODY_EMPTY',
  COMMENT_BODY_TOO_LONG: 'COMMENT_BODY_TOO_LONG',
  INVALID_COMMENT: 'INVALID_COMMENT',
} as const;

export type CommentErrorCode =
  (typeof commentErrorCodes)[keyof typeof commentErrorCodes];

export type CommentErrorCodes = {
  [
    K in keyof typeof commentErrorCodes
  ]: (typeof commentErrorCodes)[K];
};
