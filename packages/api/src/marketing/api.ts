import axios from 'axios';

import type { AddEmailToListResponse } from './types';

export const createMarketingAPI = (apiURL: string) => {
  return {
    addEmailToList: async (
      email: string,
    ): Promise<AddEmailToListResponse> => {
      try {
        const response = await axios.post<AddEmailToListResponse>(
          `${apiURL}/marketing`,
          { email },
        );

        return response.data;
      } catch (err) {
        if (axios.isAxiosError<AddEmailToListResponse>(err)) {
          return err.response?.data as AddEmailToListResponse;
        }

        throw err;
      }
    },
  };
};
