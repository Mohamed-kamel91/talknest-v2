import axios from 'axios';

import {
  CreateUserInput,
  CreateUserResponse,
  GetUserByEmailResponse,
} from './types';

export const createUsersAPI = (apiURL: string) => {
  return {
    register: async (
      input: CreateUserInput,
    ): Promise<CreateUserResponse> => {
      try {
        const response = await axios.post<CreateUserResponse>(
          `${apiURL}/users`,
          input,
        );

        return response.data;
      } catch (err) {
        if (axios.isAxiosError<CreateUserResponse>(err)) {
          return err.response?.data as CreateUserResponse;
        }

        throw err;
      }
    },
    getUserByEmail: async (
      email: string,
    ): Promise<GetUserByEmailResponse> => {
      try {
        const response = await axios.get<GetUserByEmailResponse>(
          `${apiURL}/users`,
          {
            params: { email },
          },
        );

        return response.data;
      } catch (err) {
        if (axios.isAxiosError<GetUserByEmailResponse>(err)) {
          return err.response?.data as GetUserByEmailResponse;
        }

        throw err;
      }
    },
  };
};
