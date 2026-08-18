import axios from 'axios';

import {
  CreateUserInput,
  CreateUserAPIResponse,
  GetUserByEmailAPIResponse,
} from './types';

export const createUsersAPI = (apiURL: string) => {
  return {
    register: async (
      input: CreateUserInput,
    ): Promise<CreateUserAPIResponse> => {
      try {
        const response = await axios.post<CreateUserAPIResponse>(
          `${apiURL}/users`,
          input,
        );

        return response.data;
      } catch (err) {
        if (axios.isAxiosError<CreateUserAPIResponse>(err)) {
          return err.response?.data as CreateUserAPIResponse;
        }

        throw err;
      }
    },
    getUserByEmail: async (
      email: string,
    ): Promise<GetUserByEmailAPIResponse> => {
      try {
        const response = await axios.get<GetUserByEmailAPIResponse>(
          `${apiURL}/users`,
          {
            params: { email },
          },
        );

        return response.data;
      } catch (err) {
        if (axios.isAxiosError<GetUserByEmailAPIResponse>(err)) {
          return err.response?.data as GetUserByEmailAPIResponse;
        }

        throw err;
      }
    },
  };
};
