import {
  type CommentErrorCodes,
  type PostErrorCodes,
  type RequestErrorCode,
  type ServerErrorCode,
  type NetworkErrorCode,
  MemberErrorCodes,
} from '@talknest/errors';

import { type APIResponse } from '../types';
import { CommentDTO } from './dtos';

// Get Comments By Post ID Response
export type GetCommentsByPostIdError =
  | CommentErrorCodes['COMMENTS_NOT_FOUND']
  | RequestErrorCode
  | ServerErrorCode
  | NetworkErrorCode;

export type GetCommentsByPostIdAPIResponse = APIResponse<
  CommentDTO[],
  GetCommentsByPostIdError
>;

// Post Comment Response
export type PostCommentErrorCode =
  | CommentErrorCodes['COMMENT_BODY_EMPTY']
  | CommentErrorCodes['COMMENT_BODY_TOO_LONG']
  | PostErrorCodes['POST_NOT_FOUND']
  | MemberErrorCodes['MEMBER_NOT_FOUND']
  | MemberErrorCodes['INSUFFICIENT_MEMBER_LEVEL']
  | RequestErrorCode
  | ServerErrorCode
  | NetworkErrorCode;

export type PostCommentAPIResponse = APIResponse<
  CommentDTO,
  PostCommentErrorCode
>;
