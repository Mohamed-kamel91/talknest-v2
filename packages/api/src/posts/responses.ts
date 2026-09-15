import {
  type MemberErrorCodes,
  type PostErrorCodes,
  type RequestErrorCode,
  type ServerErrorCode,
  type NetworkErrorCode,
} from '@talknest/errors';

import { type APIResponse } from '../types';
import { PostDTO } from './dtos';

// Get Posts Response
export type GetPostsErrorCode =
  RequestErrorCode | ServerErrorCode | NetworkErrorCode;

export type GetPostsAPIResponse = APIResponse<
  PostDTO[],
  GetPostsErrorCode
>;

// Create Post Response
export type CreatePostErrorCode =
  | MemberErrorCodes['MEMBER_NOT_FOUND']
  | MemberErrorCodes['INSUFFICIENT_MEMBER_LEVEL']
  | PostErrorCodes['POST_CREATION_FORBIDDEN']
  | RequestErrorCode
  | ServerErrorCode
  | NetworkErrorCode;

export type CreatePostAPIResponse = APIResponse<
  PostDTO,
  CreatePostErrorCode
>;

// Get Post by ID Response
export type GetPostByIdErrorCode =
  RequestErrorCode | ServerErrorCode | NetworkErrorCode;

export type GetPostByIdAPIResponse = APIResponse<
  PostDTO,
  GetPostByIdErrorCode
>;

// Get Post Details Response
export type GetPostDetailsErrorCode =
  RequestErrorCode | ServerErrorCode | NetworkErrorCode;

export type GetPostDetailsAPIResponse = APIResponse<
  PostDTO,
  GetPostDetailsErrorCode
>;
