import { Result, success, fail } from '@talknest/core';
import { InvalidInputError } from '@talknest/errors/request';

import { type DecodedIdToken } from '../users';
import {
  type PostCommentInput,
  postCommentInputSchema,
} from './inputs';

export class PostCommentCommand {
  private constructor(public readonly props: PostCommentInput) {}

  static create(
    input: unknown,
    // decodedToken: DecodedIdToken | undefined,
  ): Result<PostCommentCommand, InvalidInputError> {
    const result = postCommentInputSchema.safeParse(input);

    if (!result.success) {
      return fail(new InvalidInputError(result.error.issues));
    }

    return success(new PostCommentCommand(result.data));
  }
}
