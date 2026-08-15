import axios from 'axios';

import type { AddEmailToListResponse } from './types';

export const createMarketingAPI = (apiUrl: string) => {
  return {
    addEmailToList: async (
      email: string,
    ): Promise<AddEmailToListResponse> => {
      try {
        const response = await axios.post<AddEmailToListResponse>(
          `${apiUrl}/marketing`,
          { email },
        );

        return response.data;
      } catch (error: unknown) {
        if (
          axios.isAxiosError<AddEmailToListResponse>(error) &&
          error.response
        ) {
          return error.response.data;
        }

        return {
          success: false,
          statusCode: 503,
          data: null,
          error: {
            message: 'Network or server unreachable',
            type: 'NETWORK_ERROR',
          },
        };
      }
    },
  };
};
