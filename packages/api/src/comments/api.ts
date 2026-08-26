import { getAuthHeaders, type HttpClient } from '../client';
import { apiRequest } from '../api-request';
import type {
  PostCommentInput,
  PostCommentAPIResponse,
  GetCommentsByPostIdAPIResponse,
} from './types';

export const createCommentsAPI = (client: HttpClient) => {
  return {
    postComment: (input: PostCommentInput, authToken: string) =>
      apiRequest(() =>
        client.post<PostCommentAPIResponse>(
          `/posts/${input.postId}/comments`,
          input,
          getAuthHeaders(authToken),
        ),
      ),

    getCommentsByPostId: (postId: string) =>
      apiRequest(() =>
        client.get<GetCommentsByPostIdAPIResponse>(
          `/posts/${postId}/comments`,
        ),
      ),
  };
};
