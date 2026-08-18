import axios from 'axios';

import type { VoteOnPostInput, VoteOnPostAPIResponse } from './types';

export const createVotesAPI = (apiUrl: string) => {
  return {
    voteOnPost: async (
      input: VoteOnPostInput,
      authToken: string,
    ): Promise<VoteOnPostAPIResponse> => {
      try {
        const response = await axios.post<VoteOnPostAPIResponse>(
          `${apiUrl}/posts/${input.postId}/votes`,
          input,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        return response.data;
      } catch (error: unknown) {
        if (
          axios.isAxiosError<VoteOnPostAPIResponse>(error) &&
          error.response
        ) {
          return error.response.data;
        }

        return {
          success: false,
          statusCode: 502,
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
