import axios from 'axios';

import type {
  CreatePostInput,
  CreatePostAPIResponse,
  GetPostsQueryInput,
  GetPostsAPIResponse,
  GetPostByIdAPIResponse,
} from './types';
import { getAuthHeaders } from '..';

export const createPostsAPI = (apiURL: string) => {
  return {
    // Create Post
    create: async (
      input: CreatePostInput,
      authToken: string,
    ): Promise<CreatePostAPIResponse> => {
      try {
        const response = await axios.post<CreatePostAPIResponse>(
          `${apiURL}/posts/new`,
          input,
          getAuthHeaders(authToken),
        );

        return response.data;
      } catch (error: unknown) {
        if (
          axios.isAxiosError<CreatePostAPIResponse>(error) &&
          error.response
        ) {
          return error.response.data;
        }

        return {
          data: null,
          statusCode: 503,
          error: {
            type: 'NETWORK_ERROR',
            message: 'Network or server unreachable',
          },
          success: false,
        };
      }
    },

    // Get Posts
    getPosts: async (
      query: GetPostsQueryInput,
    ): Promise<GetPostsAPIResponse> => {
      try {
        const response = await axios.get<GetPostsAPIResponse>(
          `${apiURL}/posts`,
          {
            params: {
              sort: query.sort,
            },
          },
        );

        return response.data;
      } catch (error: unknown) {
        if (
          axios.isAxiosError<GetPostsAPIResponse>(error) &&
          error.response
        ) {
          return error.response.data;
        }

        return {
          data: null,
          statusCode: 503,
          error: {
            type: 'NETWORK_ERROR',
            message: 'Network or server unreachable',
          },
          success: false,
        };
      }
    },

    // Get Post By ID
    getPostById: async (
      postId: string,
    ): Promise<GetPostByIdAPIResponse> => {
      try {
        const response = await axios.get<GetPostByIdAPIResponse>(
          `${apiURL}/posts/${postId}`,
        );

        return response.data;
      } catch (error: unknown) {
        if (
          axios.isAxiosError<GetPostByIdAPIResponse>(error) &&
          error.response
        ) {
          return error.response.data;
        }

        return {
          data: null,
          statusCode: 503,
          error: {
            type: 'NETWORK_ERROR',
            message: 'Network or server unreachable',
          },
          success: false,
        };
      }
    },

    // Get Post By Slug
    getPostBySlug: async (
      slug: string,
    ): Promise<GetPostByIdAPIResponse> => {
      try {
        const response = await axios.get<GetPostByIdAPIResponse>(
          `${apiURL}/posts/slug/${slug}`,
        );

        return response.data;
      } catch (error: unknown) {
        if (
          axios.isAxiosError<GetPostByIdAPIResponse>(error) &&
          error.response
        ) {
          return error.response.data;
        }

        return {
          data: null,
          statusCode: 503,
          error: {
            message: 'Failed to fetch post',
            type: 'NETWORK_ERROR',
          },
          success: false,
        };
      }
    },
  };
};
