import {
  commentErrorTypes,
  memberErrorTypes,
  postErrorTypes,
  type RequestErrorType,
  type ServerErrorType,
} from '@talknest/errors/types';
import { applicationErrorTypes } from '@talknest/errors/application';

import { type APIResponse } from '..';

// Errors
export type CommentNotFoundError =
  typeof commentErrorTypes.COMMENT_NOT_FOUND;

export type PostNotFoundError = typeof postErrorTypes.POST_NOT_FOUND;

export type MemberNotFoundError =
  typeof memberErrorTypes.MEMBER_NOT_FOUND;

export type ForbiddenError = typeof applicationErrorTypes.FORBIDDEN;

export type ServerError = ServerErrorType;
export type RequestError = RequestErrorType;
export type NetworkError = 'NETWORK_ERROR';

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
