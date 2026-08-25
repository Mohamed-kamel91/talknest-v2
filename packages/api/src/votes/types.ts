import {
  applicationErrorCodes,
  commentErrorCodes,
  postErrorCodes,
  memberErrorCodes,
  type RequestErrorCode,
  type ServerErrorCode,
} from '@talknest/errors';

import { type APIResponse } from '../types';

// Errors
type CommentNotFoundError =
  typeof commentErrorCodes.COMMENT_NOT_FOUND;

type PostNotFoundError = typeof postErrorCodes.POST_NOT_FOUND;

type MemberNotFoundError = typeof memberErrorCodes.MEMBER_NOT_FOUND;

type ForbiddenError = typeof applicationErrorCodes.FORBIDDEN;

type RequestError = RequestErrorCode;
type ServerError = ServerErrorCode;
type NetworkError = 'NETWORK_ERROR';

// Vote Types
export type VoteType = 'upvote' | 'downvote';

// Inputs
export type VoteOnCommentInput = {
  commentId: string;
  voteType: VoteType;
  memberId: string;
};

export type VoteOnPostInput = {
  postId: string;
  voteType: VoteType;
  memberId: string;
};

// DTOs
export type PostVoteDTO = {
  postId: string;
  memberId: string;
  voteType: VoteType;
};

// Vote on Post Response
export type VoteOnPostError =
  | PostNotFoundError
  | MemberNotFoundError
  | ForbiddenError
  | RequestError
  | ServerError
  | NetworkError;

export type VoteOnPostAPIResponse = APIResponse<
  PostVoteDTO,
  VoteOnPostError
>;
