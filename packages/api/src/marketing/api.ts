import { type HttpClient } from '../client';
import { apiRequest } from '../api-request';
import type { AddEmailToListResponse } from './types';

export const createMarketingAPI = (client: HttpClient) => {
  return {
    addEmailToList: (email: string) =>
      apiRequest(() =>
        client.post<AddEmailToListResponse>('/marketing', { email }),
      ),
  };
};
