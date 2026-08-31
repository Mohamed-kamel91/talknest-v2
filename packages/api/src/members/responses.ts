import {
  type MemberErrorCodes,
  type UserErrorCodes,
  type RequestErrorCode,
  type ServerErrorCode,
  type NetworkErrorCode,
} from '@talknest/errors';

import { type APIResponse } from '../types';
import { MemberDTO } from './dtos';

// Create Member Response
export type CreateMemberErrorCode =
  | UserErrorCodes['USERNAME_ALREADY_TAKEN']
  | RequestErrorCode
  | ServerErrorCode
  | NetworkErrorCode;

export type CreateMemberAPIResponse = APIResponse<
  MemberDTO,
  CreateMemberErrorCode
>;

// Get Member Details Response
export type GetMemberDetailsErrorCode =
  | MemberErrorCodes['MEMBER_NOT_FOUND']
  | ServerErrorCode
  | NetworkErrorCode;

export type GetMemberDetailsAPIResponse = APIResponse<
  MemberDTO,
  GetMemberDetailsErrorCode
>;
