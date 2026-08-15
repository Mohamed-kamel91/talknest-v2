import type {
  commentErrorTypes,
  postErrorTypes,
  RequestErrorType,
  ServerErrorType,
} from '@talknest/errors/types';

import { type APIResponse } from '..';
import { type MemberDTO } from '../members';

// Comment Errors
export type CommentsNotFoundError =
  typeof commentErrorTypes.COMMENTS_NOT_FOUND;

export type InvalidCommentError =
  typeof commentErrorTypes.INVALID_COMMENT;

export type PostNotFoundError = typeof postErrorTypes.POST_NOT_FOUND;

export type RequestError = RequestErrorType;
export type ServerError = ServerErrorType;

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

export type GetCommentsByPostIdResponse = APIResponse<
  CommentDTO[],
  GetCommentsByPostIdError
>;

// Post Comment Response
export type PostCommentError =
  | InvalidCommentError
  | PostNotFoundError
  | RequestError
  | ServerError;

export type PostCommentResponse = APIResponse<
  CommentDTO,
  PostCommentError
>;
