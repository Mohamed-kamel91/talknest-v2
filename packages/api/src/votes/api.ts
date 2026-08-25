import type { VoteOnPostInput, VoteOnPostAPIResponse } from './types';
import { HttpClient } from '../client';
import { apiRequest } from '../api-request';

export const createVotesAPI = (client: HttpClient) => {
  return {
    voteOnPost: (input: VoteOnPostInput, authToken: string) =>
      apiRequest(() =>
        client.post<VoteOnPostAPIResponse>(
          `/posts/${input.postId}/votes`,
          input,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          },
        ),
      ),
  };
};
