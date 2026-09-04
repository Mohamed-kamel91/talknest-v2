import {
  success,
  fail,
  type Result,
} from '@talknest/core/application';
import { type InvalidRequestQueryParamsError } from '@talknest/errors/request';

import {
  getPostByIdQueryInputSchema,
  getPostsQueryInputSchema,
  type GetPostByIdQueryInput,
  type GetPostsQueryInput,
} from './inputs';
import { validateQueryInput } from '../validate-query-input';

// Get Post By ID
export class GetPostByIdQuery {
  private constructor(public readonly props: GetPostByIdQueryInput) {}

  static create(
    input: unknown,
  ): Result<GetPostByIdQuery, InvalidRequestQueryParamsError> {
    const inputResult = validateQueryInput(
      getPostByIdQueryInputSchema,
      input,
    );

    if (inputResult.isFailure) {
      return fail(inputResult.getError());
    }

    return success(new GetPostByIdQuery(inputResult.getValue()));
  }
}

// Get Posts
export class GetPostsQuery {
  constructor(public readonly props: GetPostsQueryInput) {}

  static create(
    input: unknown,
  ): Result<GetPostsQuery, InvalidRequestQueryParamsError> {
    const queryOrError = validateQueryInput(
      getPostsQueryInputSchema,
      input,
    );

    if (queryOrError.isFailure) {
      return fail(queryOrError.getError());
    }

    return success(new GetPostsQuery(queryOrError.getValue()));
  }
}
