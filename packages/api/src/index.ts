import { createMarketingAPI } from './marketing';
import { createPostsAPI } from './posts';
import { createUsersAPI } from './users';

export type APIError<U> = {
  type: U;
  code: number;
  message: string;
};

export type SuccessResponse<Data> = {
  success: true;
  data: Data;
  error: null;
};

export type FailureResponse<ErrorType> = {
  success: false;
  data: null;
  error: APIError<ErrorType>;
};

export type APIResponse<T, U> =
  SuccessResponse<T> | FailureResponse<U>;

export const createAPIClient = (apiURL: string) => {
  return {
    marketing: createMarketingAPI(apiURL),
    posts: createPostsAPI(apiURL),
    users: createUsersAPI(apiURL),
    // members: createMembersAPI(apiURL),
    // comments: createCommentssAPI(apiURL),
    // votes: createVotesAPI(apiURL),
  };
};
