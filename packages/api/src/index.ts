import { createMarketingAPI } from './marketing';
import { createPostsAPI } from './posts';
import { createUsersAPI } from './users';
import { createCommentsAPI } from './comments';
import { createMembersAPI } from './members';
import { createVotesAPI } from './votes';

export type APIError<U> = {
  type: U;
  message: string;
};

export type SuccessResponse<Data> = {
  success: true;
  data: Data;
  statusCode: number;
  error: null;
};

export type FailureResponse<ErrorType> = {
  success: false;
  data: null;
  statusCode: number;
  error: APIError<ErrorType>;
};

export type APIResponse<T, U> =
  SuccessResponse<T> | FailureResponse<U>;

export const getAuthHeaders = (token?: string) => ({
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {},
});

export type APIClient = ReturnType<typeof createAPIClient>;

export const createAPIClient = (apiURL: string) => {
  return {
    comments: createCommentsAPI(apiURL),
    marketing: createMarketingAPI(apiURL),
    members: createMembersAPI(apiURL),
    posts: createPostsAPI(apiURL),
    users: createUsersAPI(apiURL),
    votes: createVotesAPI(apiURL),
  };
};
