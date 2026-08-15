import {
  type RequestErrorType,
  type ServerErrorType,
  userErrorTypes,
} from '@talknest/errors/types';

import { APIResponse } from '..';

// User Error Types
export type EmailAlreadyTakenError =
  typeof userErrorTypes.EMAIL_ALREADY_TAKEN;

export type UsernameAlreadyTakenError =
  typeof userErrorTypes.USERNAME_ALREADY_TAKEN;

export type UserNotFoundError = typeof userErrorTypes.USER_NOT_FOUND;

export type ServerError = ServerErrorType;
export type RequestError = RequestErrorType;

export type DecodedIdToken = {
  email: string;
  uid: string;
};

// User Response DTO
export type UserDTO = {
  id: number;
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

export type CreateUserResponse = APIResponse<
  UserDTO,
  CreateUserError
>;

// Get User By Email Response
export type GetUserByEmailError =
  UserNotFoundError | RequestError | ServerError;

export type GetUserByEmailResponse = APIResponse<
  UserDTO,
  GetUserByEmailError
>;
