import {
  type PostErrorCodes,
  type MemberErrorCodes,
  type RequestErrorCode,
  type ServerErrorCode,
  type NetworkErrorCode,
} from '@talknest/errors';

import { type APIResponse } from '../types';
import { PostVoteDTO } from './dtos';

// Vote on Post Response
export type VoteOnPostErrorCode =
  | PostErrorCodes['POST_NOT_FOUND']
  | MemberErrorCodes['MEMBER_NOT_FOUND']
  | RequestErrorCode
  | ServerErrorCode
  | NetworkErrorCode;

export type VoteOnPostAPIResponse = APIResponse<
  PostVoteDTO,
  VoteOnPostErrorCode
>;
