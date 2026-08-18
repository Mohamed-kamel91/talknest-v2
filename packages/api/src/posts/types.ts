import type {
  memberErrorTypes,
  postErrorTypes,
  RequestErrorType,
  ServerErrorType,
} from '@talknest/errors/types';

import { type APIResponse } from '..';
import { MemberDTO } from '../members';

// Error types
export type MemberNotFoundError =
  typeof memberErrorTypes.MEMBER_NOT_FOUND;

export type PostCreationForbiddenError =
  typeof postErrorTypes.POST_CREATION_FORBIDDEN;

export type RequestError = RequestErrorType;
export type ServerError = ServerErrorType;
export type NetworkError = 'NETWORK_ERROR';

// Post Types
export type PostType = 'link' | 'text';

// Inputs
export type CreatePostInput = {
  title: string;
  memberId: string;
  content?: string;
  link?: string;
  postType: PostType;
};

export type GetPostsQueryOption = 'popular' | 'recent';

export type GetPostsQueryInput = {
  sort: GetPostsQueryOption;
};

// DTOs
export type PostDTO = {
  id: string;
  postType: string;
  title: string;
  content?: string | undefined;
  link?: string | undefined;
  slug: string;
  numComments: number;
  voteScore: number;
  member: MemberDTO;
  dateCreated: string;
  lastUpdated: string;
};

// Get Posts Response
export type GetPostsErrors =
  ServerError | NetworkError | RequestError;

export type GetPostsAPIResponse = APIResponse<
  PostDTO[],
  GetPostsErrors
>;

// Create Post Response
export type CreatePostError =
  | MemberNotFoundError
  | PostCreationForbiddenError
  | ServerError
  | NetworkError
  | RequestError;

export type CreatePostAPIResponse = APIResponse<
  PostDTO,
  CreatePostError
>;

// Get Post by ID Response
export type GetPostByIdError =
  ServerError | NetworkError | RequestError;
export type GetPostByIdAPIResponse = APIResponse<
  PostDTO,
  GetPostByIdError
>;

// Get Post Details Response
export type GetPostDetailsError =
  ServerError | NetworkError | RequestError;

export type GetPostDetailsAPIResponse = APIResponse<
  PostDTO,
  GetPostDetailsError
>;
