import { apiRequest } from '../api-request';
import { type HttpClient } from '../client';
import type {
  CreateUserInput,
  CreateUserAPIResponse,
  GetUserByEmailAPIResponse,
} from './types';

export const createUsersAPI = (client: HttpClient) => {
  return {
    authenticate: (code: string) =>
      apiRequest(() => client.post('/users/authenticate', { code })),

    register: (input: CreateUserInput) =>
      apiRequest(() =>
        client.post<CreateUserAPIResponse>('/users', input),
      ),

    getUserByEmail: (email: string) =>
      apiRequest(() =>
        client.get<GetUserByEmailAPIResponse>('/users', {
          params: { email },
        }),
      ),
  };
};
