import {
  type RequestErrorCode,
  type ServerErrorCode,
  type NetworkErrorCode,
} from '@talknest/errors';

import { APIResponse } from '../types';
import { AddEmailToListDTO } from './dtos';
// Add Email To List Response
export type AddEmailToListErrorCode =
  RequestErrorCode | ServerErrorCode | NetworkErrorCode;

export type AddEmailToListAPIResponse = APIResponse<
  AddEmailToListDTO,
  AddEmailToListErrorCode
>;
