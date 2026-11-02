import {
  type PostErrorCodes,
  type MemberErrorCodes,
  type RequestErrorCode,
  type ServerErrorCode,
  type NetworkErrorCode,
  CommentErrorCodes,
} from '@talknest/errors';

import { type APIResponse } from '../types';
import { VoteOnCommentDTO, VoteOnPostDTO } from './dtos';

// Vote on Post Response
export type VoteOnPostErrorCode =
  | PostErrorCodes['POST_NOT_FOUND']
  | MemberErrorCodes['MEMBER_NOT_FOUND']
  | MemberErrorCodes['INSUFFICIENT_MEMBER_LEVEL']
  | RequestErrorCode
  | ServerErrorCode
  | NetworkErrorCode;

export type VoteOnPostAPIResponse = APIResponse<VoteOnPostDTO, VoteOnPostErrorCode>;

// Vote on Comment Response
export type VoteOnCommentErrorCode =
  | CommentErrorCodes['COMMENT_NOT_FOUND']
  | MemberErrorCodes['MEMBER_NOT_FOUND']
  | MemberErrorCodes['INSUFFICIENT_MEMBER_LEVEL']
  | RequestErrorCode
  | ServerErrorCode
  | NetworkErrorCode;

export type VoteOnCommentAPIResponse = APIResponse<VoteOnCommentDTO, VoteOnPostErrorCode>;
