import {
  ValidationError,
  NotFoundError,
} from '@talknest/errors/application';
import { postErrorCodes } from '@talknest/errors/domain';

export type PostCreationError =
  | InvalidPostTypeError
  | InvalidPostTitleError
  | InvalidPostContentError
  | InvalidPostLinkError
  | InvalidTextPostError
  | InvalidLinkPostError;

export class InvalidPostTitleError extends ValidationError {
  readonly code = postErrorCodes.INVALID_POST_TITLE;

  constructor(message: string = 'Post title is invalid') {
    super(message);
  }
}

export class InvalidPostContentError extends ValidationError {
  readonly code = postErrorCodes.INVALID_POST_CONTENT;

  constructor(message: string = 'Post content is invalid') {
    super(message);
  }
}

export class InvalidPostLinkError extends ValidationError {
  readonly code = postErrorCodes.INVALID_POST_LINK;

  constructor(message: string = 'Post link is invalid') {
    super(message);
  }
}

export class InvalidPostTypeError extends ValidationError {
  readonly code = postErrorCodes.INVALID_POST_TYPE;

  constructor(value: string, message?: string) {
    super(message ?? `Invalid post type: ${value}`);
  }
}

export class InvalidTextPostError extends ValidationError {
  readonly code = postErrorCodes.INVALID_TEXT_POST;

  constructor(message = 'Text post is invalid') {
    super(message);
  }
}

export class InvalidLinkPostError extends ValidationError {
  readonly code = postErrorCodes.INVALID_LINK_POST;

  constructor(message = 'Link post is invalid') {
    super(message);
  }
}

export class PostNotFoundError extends NotFoundError {
  readonly code = postErrorCodes.POST_NOT_FOUND;

  constructor() {
    super('Post not found');
  }
}
