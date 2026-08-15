import type {
  RequestErrorType,
  ServerErrorType,
} from '@talknest/errors/types';

import { type APIResponse } from '..';

// Errors
export type RequestError = RequestErrorType;
export type ServerError = ServerErrorType;
export type NetworkError = 'NETWORK_ERROR';

// DTOs
export type EmailSubscription = {
  email: string;
  subscribed: boolean;
};

// Add Email To List Response
export type AddEmailToListError =
  RequestError | ServerError | NetworkError;

export type AddEmailToListResponseData = {
  subscription: EmailSubscription;
};

export type AddEmailToListResponse = APIResponse<
  AddEmailToListResponseData,
  AddEmailToListError
>;
