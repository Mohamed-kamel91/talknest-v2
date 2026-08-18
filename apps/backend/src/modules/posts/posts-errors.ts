import z from 'zod';

import {
  BadRequestError,
  NotFoundError,
  postErrorTypes,
} from '@talknest/errors';
import { CreatePostInput } from '@talknest/api/posts';

export type PostCreationError =
  | InvalidPostTitleError
  | InvalidPostContentError
  | InvalidPostLinkError
  | InvalidPostTypeError;

export function mapPostValidationError(
  error: z.ZodError,
  input: CreatePostInput,
): PostCreationError {
  const issue = error.issues[0];

  switch (issue?.path[0]) {
    case 'title':
      return new InvalidPostTitleError(issue.message);

    case 'content':
      return new InvalidPostContentError(issue.message);

    case 'link':
      return new InvalidPostLinkError(issue.message);

    case 'postType':
      return new InvalidPostTypeError(input.postType);

    default:
      return new InvalidPostTypeError(input.postType);
  }
}

export class InvalidPostTitleError extends BadRequestError<
  typeof postErrorTypes.INVALID_POST_TITLE
> {
  constructor(message: string) {
    super(
      postErrorTypes.INVALID_POST_TITLE,
      `Invalid post title: ${message}`,
    );
  }
}

export class InvalidPostContentError extends BadRequestError<
  typeof postErrorTypes.INVALID_POST_CONTENT
> {
  constructor(message: string) {
    super(
      postErrorTypes.INVALID_POST_CONTENT,
      `Invalid post content: ${message}`,
    );
  }
}

export class InvalidPostLinkError extends BadRequestError<
  typeof postErrorTypes.INVALID_POST_LINK
> {
  constructor(message: string) {
    super(
      postErrorTypes.INVALID_POST_LINK,
      `Invalid post link: ${message}`,
    );
  }
}

export class InvalidPostTypeError extends BadRequestError<
  typeof postErrorTypes.INVALID_POST_TYPE
> {
  constructor(type: string) {
    super(
      postErrorTypes.INVALID_POST_TYPE,
      `Invalid Post type: ${type}`,
    );
  }
}

export class PostNotFoundError extends NotFoundError<
  typeof postErrorTypes.POST_NOT_FOUND
> {
  constructor() {
    super(postErrorTypes.POST_NOT_FOUND, 'Post not foud');
  }
}
