import axios from 'axios';

import type { GetPostsParams, GetPostsResponse } from './types';

export const createPostsAPI = (apiURL: string) => {
  return {
    getPosts: async ({
      sort,
    }: GetPostsParams): Promise<GetPostsResponse> => {
      try {
        const response = await axios.get<GetPostsResponse>(
          `${apiURL}/posts`,
          {
            params: { sort },
          },
        );

        return response.data;
      } catch (err) {
        if (axios.isAxiosError<GetPostsResponse>(err)) {
          return err.response?.data as GetPostsResponse;
        }

        throw err;
      }
    },
  };
};
