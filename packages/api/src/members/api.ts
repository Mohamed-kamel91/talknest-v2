import axios from 'axios';

import { getAuthHeaders } from '..';
import type {
  CreateMemberInput,
  CreateMemberResponse,
  GetMemberDetailsResponse,
} from './types';

export const createMembersAPI = (apiURL: string) => {
  return {
    register: async (
      input: CreateMemberInput,
      authToken: string,
    ): Promise<CreateMemberResponse> => {
      try {
        const response = await axios.post<CreateMemberResponse>(
          `${apiURL}/members`,
          input,
          getAuthHeaders(authToken),
        );

        return response.data;
      } catch (error: unknown) {
        if (
          axios.isAxiosError<CreateMemberResponse>(error) &&
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
    ): Promise<GetMemberDetailsResponse> => {
      try {
        const response = await axios.get<GetMemberDetailsResponse>(
          `${apiURL}/members/me`,
          getAuthHeaders(authToken),
        );

        return response.data;
      } catch (error: unknown) {
        if (
          axios.isAxiosError<GetMemberDetailsResponse>(error) &&
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
