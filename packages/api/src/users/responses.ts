import { UUID } from 'node:crypto';

import {
  type UserErrorCodes,
  type RequestErrorCode,
  type ServerErrorCode,
  type NetworkErrorCode,
} from '@talknest/errors';

import { APIResponse } from '../types';
import { UserDTO } from './dtos';

// Create User Response
export type CreateUserErrorCode =
  | UserErrorCodes['EMAIL_ALREADY_TAKEN']
  | UserErrorCodes['USERNAME_ALREADY_TAKEN']
  | RequestErrorCode
  | ServerErrorCode
  | NetworkErrorCode;

export type CreateUserAPIResponse = APIResponse<
  UserDTO,
  CreateUserErrorCode
>;

// Get User By Email Response
export type GetUserByEmailErrorCode =
  | UserErrorCodes['USER_NOT_FOUND']
  | RequestErrorCode
  | ServerErrorCode
  | NetworkErrorCode;

export type GetUserByEmailAPIResponse = APIResponse<
  UserDTO,
  GetUserByEmailErrorCode
>;
