import axios from 'axios';

import type {
  CreatePostInput,
  CreatePostResponse,
  GetPostsQueryInput,
  GetPostsResponse,
  GetPostByIdResponse,
} from './types';
import { getAuthHeaders } from '..';

export const createPostsAPI = (apiURL: string) => {
  return {
    // Create Post
    create: async (
      input: CreatePostInput,
      authToken: string,
    ): Promise<CreatePostResponse> => {
      try {
        const response = await axios.post<CreatePostResponse>(
          `${apiURL}/posts/new`,
          input,
          getAuthHeaders(authToken),
        );

        return response.data;
      } catch (error: unknown) {
        if (
          axios.isAxiosError<CreatePostResponse>(error) &&
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
    ): Promise<GetPostsResponse> => {
      try {
        const response = await axios.get<GetPostsResponse>(
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
          axios.isAxiosError<GetPostsResponse>(error) &&
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
    ): Promise<GetPostByIdResponse> => {
      try {
        const response = await axios.get<GetPostByIdResponse>(
          `${apiURL}/posts/${postId}`,
        );

        return response.data;
      } catch (error: unknown) {
        if (
          axios.isAxiosError<GetPostByIdResponse>(error) &&
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
    ): Promise<GetPostByIdResponse> => {
      try {
        const response = await axios.get<GetPostByIdResponse>(
          `${apiURL}/posts/slug/${slug}`,
        );

        return response.data;
      } catch (error: unknown) {
        if (
          axios.isAxiosError<GetPostByIdResponse>(error) &&
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
