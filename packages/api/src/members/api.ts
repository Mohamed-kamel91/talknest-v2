import { getAuthHeaders, type HttpClient } from '../client';
import { apiRequest } from '../api-request';
import type {
  CreateMemberInput,
  CreateMemberAPIResponse,
  GetMemberDetailsAPIResponse,
} from './types';

export const createMembersAPI = (client: HttpClient) => {
  return {
    register: (input: CreateMemberInput, authToken: string) =>
      apiRequest(() =>
        client.post<CreateMemberAPIResponse>(
          '/members',
          input,
          getAuthHeaders(authToken),
        ),
      ),

    getMemberDetails: (authToken: string) =>
      apiRequest(() =>
        client.get<GetMemberDetailsAPIResponse>(
          '/members/me',
          getAuthHeaders(authToken),
        ),
      ),
  };
};
