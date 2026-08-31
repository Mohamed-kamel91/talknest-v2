import { type HttpClient } from '../client';
import { apiRequest } from '../api-request';

import type { AddEmailToListAPIResponse } from './responses';

export const createMarketingAPI = (client: HttpClient) => {
  return {
    addEmailToList: (email: string) =>
      apiRequest(() =>
        client.post<AddEmailToListAPIResponse>('/marketing', {
          email,
        }),
      ),
  };
};
