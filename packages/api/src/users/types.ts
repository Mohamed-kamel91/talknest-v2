import { APIResponse } from '..';
import {
  RequestErrorType,
  ServerErrorType,
  userErrorTypes,
} from '@talknest/errors/types';

// User Error Types

export type EmailAlreadyTakenError =
  typeof userErrorTypes.EMAIL_ALREADY_TAKEN;

export type UsernameAlreadyTakenError =
  typeof userErrorTypes.USERNAME_ALREADY_TAKEN;

export type UserNotFoundError = typeof userErrorTypes.USER_NOT_FOUND;

export type ServerError = ServerErrorType;
export type RequestError = RequestErrorType;

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

// User Response Data

export type UserResponseData = {
  user: UserDTO;
};

// Create User Response

export type CreateUserError =
  EmailAlreadyTakenError | UsernameAlreadyTakenError | ServerError;

export type CreateUserResponse = APIResponse<
  UserResponseData,
  CreateUserError
>;

// Get User By Email Response

export type GetUserByEmailError = UserNotFoundError | RequestError;

export type GetUserByEmailResponse = APIResponse<
  UserResponseData,
  GetUserByEmailError
>;
