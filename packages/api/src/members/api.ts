import axios from 'axios';

import { getAuthHeaders } from '..';
import type {
  CreateMemberInput,
  CreateMemberAPIResponse,
  GetMemberDetailsAPIResponse,
} from './types';

export const createMembersAPI = (apiURL: string) => {
  return {
    register: async (
      input: CreateMemberInput,
      authToken: string,
    ): Promise<CreateMemberAPIResponse> => {
      try {
        const response = await axios.post<CreateMemberAPIResponse>(
          `${apiURL}/members`,
          input,
          getAuthHeaders(authToken),
        );

        return response.data;
      } catch (error: unknown) {
        if (
          axios.isAxiosError<CreateMemberAPIResponse>(error) &&
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

    getMemberDetails: async (
      authToken: string,
    ): Promise<GetMemberDetailsAPIResponse> => {
      try {
        const response = await axios.get<GetMemberDetailsAPIResponse>(
          `${apiURL}/members/me`,
          getAuthHeaders(authToken),
        );

        return response.data;
      } catch (error: unknown) {
        if (
          axios.isAxiosError<GetMemberDetailsAPIResponse>(error) &&
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
