import {
  userErrorCodes,
  type RequestErrorCode,
  type ServerErrorCode,
} from '@talknest/errors';

import { APIResponse } from '../types';
import { UUID } from 'node:crypto';

// User Error Types
type EmailAlreadyTakenError =
  typeof userErrorCodes.EMAIL_ALREADY_TAKEN;

type UsernameAlreadyTakenError =
  typeof userErrorCodes.USERNAME_ALREADY_TAKEN;

type UserNotFoundError = typeof userErrorCodes.USER_NOT_FOUND;

type RequestError = RequestErrorCode;
type ServerError = ServerErrorCode;

export type DecodedIdToken = {
  email?: string;
  uid: string;
};

// User Response DTO
export type UserDTO = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

// User Request DTO
export type CreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

// Create User Response
export type CreateUserError =
  EmailAlreadyTakenError | UsernameAlreadyTakenError | ServerError;

export type CreateUserAPIResponse = APIResponse<
  UserDTO,
  CreateUserError
>;

// Get User By Email Response
export type GetUserByEmailError =
  UserNotFoundError | RequestError | ServerError;

export type GetUserByEmailAPIResponse = APIResponse<
  UserDTO,
  GetUserByEmailError
>;
