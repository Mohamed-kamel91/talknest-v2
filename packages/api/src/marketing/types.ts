import type { APIResponse } from '..';

import type {
  RequestErrorType,
  ServerErrorType,
} from '@talknest/errors/types';

// Marketing Errors

export type RequestError = RequestErrorType;
export type ServerError = ServerErrorType;

// Marketing DTOs

export type EmailSubscription = {
  email: string;
  subscribed: boolean;
};

// Add Email To List Response

export type AddEmailToListError = RequestError | ServerError;

export type AddEmailToListResponseData = {
  subscription: EmailSubscription;
};

export type AddEmailToListResponse = APIResponse<
  AddEmailToListResponseData,
  AddEmailToListError
>;
