import {
  commentErrorCodes,
  postErrorCodes,
  type RequestErrorCode,
  type ServerErrorCode,
} from '@talknest/errors';

import { type APIResponse } from '../types';
import { type MemberDTO } from '../members';

// Comment Errors
type CommentsNotFoundError =
  typeof commentErrorCodes.COMMENTS_NOT_FOUND;

type InvalidCommentError = typeof commentErrorCodes.INVALID_COMMENT;

type PostNotFoundError = typeof postErrorCodes.POST_NOT_FOUND;

type RequestError = RequestErrorCode;
type ServerError = ServerErrorCode;

// Comment DTO
export type CommentDTO = {
  id: string;
  postId: string;
  commentId: string;
  parentCommentId?: string;
  text: string;
  member: MemberDTO;
  createdAt: string | Date;
  childComments: CommentDTO[];
  points: number;
};

// Comment Inputs
export type PostCommentInput = {
  postId: string;
  text: string;
  memberId: string;
  parentCommentId?: string;
};

// Get Comments By Post ID Response
export type GetCommentsByPostIdError =
  CommentsNotFoundError | RequestError | ServerError;

export type GetCommentsByPostIdAPIResponse = APIResponse<
  CommentDTO[],
  GetCommentsByPostIdError
>;

// Post Comment Response
export type PostCommentError =
  | InvalidCommentError
  | PostNotFoundError
  | RequestError
  | ServerError;

export type PostCommentAPIResponse = APIResponse<
  CommentDTO,
  PostCommentError
>;
