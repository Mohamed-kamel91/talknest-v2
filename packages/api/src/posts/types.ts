import type { APIResponse } from '..';
import type { Comment } from '../comments';
import type { UserDTO } from '../users';
import type { Vote } from '../votes';

import type {
  RequestErrorType,
  ServerErrorType,
} from '@talknest/errors/types';

// Post Error Types

export type RequestError = RequestErrorType;
export type ServerError = ServerErrorType;

// Get Posts Response

export type GetPostsError = RequestError | ServerError;

export type GetPostsResponseData = {
  posts: PostDTO[];
};

export type GetPostsResponse = APIResponse<
  GetPostsResponseData,
  GetPostsError
>;

// Post Request DTO

export type GetPostsSortOption = 'recent';

export type GetPostsParams = {
  sort: GetPostsSortOption;
};

// Post Response DTO

export type PostDTO = {
  id: number;
  memberId: number;
  postType: string;
  title: string;
  content: string;
  dateCreated: string;
  memberPostedBy: {
    user: UserDTO;
  };
  votes: Vote[];
  comments: Comment[];
};
