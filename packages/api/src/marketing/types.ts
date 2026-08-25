import {
  type RequestErrorCode,
  type ServerErrorCode,
} from '@talknest/errors';

import { APIResponse } from '../types';

// Errors
type RequestError = RequestErrorCode;
type ServerError = ServerErrorCode;
type NetworkError = 'NETWORK_ERROR';

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
