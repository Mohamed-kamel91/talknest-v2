import axios from 'axios';

import type { VoteOnPostInput, VoteOnPostResponse } from './types';

export const createVotesAPI = (apiUrl: string) => {
  return {
    voteOnPost: async (
      input: VoteOnPostInput,
      authToken: string,
    ): Promise<VoteOnPostResponse> => {
      try {
        const response = await axios.post<VoteOnPostResponse>(
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
          axios.isAxiosError<VoteOnPostResponse>(error) &&
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
