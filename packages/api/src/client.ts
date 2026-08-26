import axios, { CreateAxiosDefaults } from 'axios';

import { createMarketingAPI } from './marketing';
import { createPostsAPI } from './posts';
import { createUsersAPI } from './users';
import { createCommentsAPI } from './comments';
import { createMembersAPI } from './members';
import { createVotesAPI } from './votes';

// Auth headers: should be handled by request interceptor
export const getAuthHeaders = (token?: string) => ({
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {},
});

export type HttpClient = ReturnType<typeof createHttpClient>;

// Http client
const createHttpClient = (config: CreateAxiosDefaults) => {
  const instance = axios.create({
    ...config,
    timeout: config.timeout ?? 8000,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  // client.interceptors.request.use(/* ... */);
  // client.interceptors.response.use(/* ... */);

  return instance;
};

export type APIClient = ReturnType<typeof createAPIClient>;

export const createAPIClient = (config: CreateAxiosDefaults) => {
  const httpClient = createHttpClient(config);

  return {
    comments: createCommentsAPI(httpClient),
    marketing: createMarketingAPI(httpClient),
    members: createMembersAPI(httpClient),
    posts: createPostsAPI(httpClient),
    users: createUsersAPI(httpClient),
    votes: createVotesAPI(httpClient),
  };
};
