import {
  memberErrorTypes,
  RequestErrorType,
  ServerErrorType,
} from '@talknest/errors/types';

import { type APIResponse } from '..';
import { type UsernameAlreadyTakenError } from '../users';

// Errors
export type MemberNotFoundError =
  typeof memberErrorTypes.MEMBER_NOT_FOUND;

export type RequestError = RequestErrorType;
export type ServerError = ServerErrorType;
export type NetworkError = 'NETWORK_ERROR';

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

export type CreateMemberResponse = APIResponse<
  MemberDTO,
  CreateMemberError
>;

// Get Member Details Response
export type GetMemberDetailsError =
  MemberNotFoundError | ServerError | 'NETWORK_ERROR';

export type GetMemberDetailsResponse = APIResponse<
  MemberDTO,
  GetMemberDetailsError
>;

export type AnyMemberApiResponse = CreateMemberResponse;
