import { getAuthHeaders, type HttpClient } from '../client';
import { apiRequest } from '../api-request';
import type {
  CreatePostInput,
  CreatePostAPIResponse,
  GetPostsQueryInput,
  GetPostsAPIResponse,
  GetPostByIdAPIResponse,
} from './types';

export const createPostsAPI = (client: HttpClient) => {
  return {
    create: (input: CreatePostInput, authToken: string) =>
      apiRequest(() =>
        client.post<CreatePostAPIResponse>(
          '/posts',
          input,
          getAuthHeaders(authToken),
        ),
      ),

    getPosts: (query: GetPostsQueryInput) =>
      apiRequest(() =>
        client.get<GetPostsAPIResponse>('/posts', {
          params: {
            sort: query.sort,
          },
        }),
      ),

    getPostById: (postId: string) =>
      apiRequest(() =>
        client.get<GetPostByIdAPIResponse>(`/posts/${postId}`),
      ),

    getPostBySlug: (slug: string) =>
      apiRequest(() =>
        client.get<GetPostByIdAPIResponse>(`/posts/slug/${slug}`),
      ),
  };
};
