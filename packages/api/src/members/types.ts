import {
  memberErrorCodes,
  userErrorCodes,
  type RequestErrorCode,
  type ServerErrorCode,
} from '@talknest/errors';

import { type APIResponse } from '../types';

// Errors
type MemberNotFoundError = typeof memberErrorCodes.MEMBER_NOT_FOUND;
type UsernameAlreadyTakenError =
  typeof userErrorCodes.USERNAME_ALREADY_TAKEN;

type RequestError = RequestErrorCode;
type ServerError = ServerErrorCode;
type NetworkError = 'NETWORK_ERROR';

// Reputation
export const reputationLevel = {
  Level1: 'Level1',
  Level2: 'Level2',
  Level3: 'Level3',
} as const;

export type ReputationLevel =
  (typeof reputationLevel)[keyof typeof reputationLevel];

// Inputs
export type CreateMemberInput = {
  username: string;
  email: string;
  userId: string;
};

// DTOs
export type MemberDTO = {
  userId: string;
  memberId: string;
  username: string;
  reputationLevel: ReputationLevel;
  reputationScore: number;
};

// Create Member Response
export type CreateMemberError =
  | UsernameAlreadyTakenError
  | ServerError
  | RequestError
  | NetworkError;

export type CreateMemberAPIResponse = APIResponse<
  MemberDTO,
  CreateMemberError
>;

// Get Member Details Response
export type GetMemberDetailsError =
  MemberNotFoundError | ServerError | 'NETWORK_ERROR';

export type GetMemberDetailsAPIResponse = APIResponse<
  MemberDTO,
  GetMemberDetailsError
>;
