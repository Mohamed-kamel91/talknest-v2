import {
  memberErrorCodes,
  postErrorCodes,
  type RequestErrorCode,
  type ServerErrorCode,
} from '@talknest/errors';

import { type APIResponse } from '../types';
import { MemberDTO } from '../members';

// Error types
type MemberNotFoundError = typeof memberErrorCodes.MEMBER_NOT_FOUND;

type PostCreationForbiddenError =
  typeof postErrorCodes.POST_CREATION_FORBIDDEN;

type RequestError = RequestErrorCode;
type ServerError = ServerErrorCode;
type NetworkError = 'NETWORK_ERROR';

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
