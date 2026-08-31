import {
  type CommentErrorCodes,
  type PostErrorCodes,
  type RequestErrorCode,
  type ServerErrorCode,
  type NetworkErrorCode,
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
  | CommentErrorCodes['INVALID_COMMENT']
  | PostErrorCodes['POST_NOT_FOUND']
  | RequestErrorCode
  | ServerErrorCode
  | NetworkErrorCode;

export type PostCommentAPIResponse = APIResponse<
  CommentDTO,
  PostCommentErrorCode
>;
