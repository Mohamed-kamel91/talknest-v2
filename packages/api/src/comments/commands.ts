import {
  success,
  fail,
  type Result,
} from '@talknest/core/application';
import { type InvalidRequestInputError } from '@talknest/errors/request';

import { type DecodedIdToken } from '../users';
import { validateCommandInput } from '../validate-command-input';
import {
  type PostCommentInput,
  postCommentInputSchema,
} from './inputs';

export class PostCommentCommand {
  private constructor(public readonly props: PostCommentInput) {}

  static create(
    input: unknown,
    // decodedToken: DecodedIdToken | undefined,
  ): Result<PostCommentCommand, InvalidRequestInputError> {
    const inputOrError = validateCommandInput(
      postCommentInputSchema,
      input,
    );

    if (inputOrError.isFailure) {
      return fail(inputOrError.getError());
    }

    return success(new PostCommentCommand(inputOrError.getValue()));
  }
}
