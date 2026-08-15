import axios from 'axios';

import type {
  PostCommentInput,
  PostCommentResponse,
  GetCommentsByPostIdResponse,
} from './types';

export const createCommentsAPI = (apiURL: string) => {
  return {
    getCommentsByPostId: async (
      postId: string,
    ): Promise<GetCommentsByPostIdResponse> => {
      try {
        const response = await axios.get<GetCommentsByPostIdResponse>(
          `${apiURL}/posts/${postId}/comments`,
        );

        return response.data;
      } catch (err) {
        if (axios.isAxiosError<GetCommentsByPostIdResponse>(err)) {
          return err.response?.data as GetCommentsByPostIdResponse;
        }

        throw err;
      }
    },

    postComment: async (
      input: PostCommentInput,
    ): Promise<PostCommentResponse> => {
      try {
        const response = await axios.post<PostCommentResponse>(
          `${apiURL}/comments`,
          input,
        );

        return response.data;
      } catch (err) {
        if (axios.isAxiosError<PostCommentResponse>(err)) {
          return err.response?.data as PostCommentResponse;
        }

        throw err;
      }
    },
  };
};
