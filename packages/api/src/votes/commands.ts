import { type Result, success, fail } from '@talknest/core/application';
import { InvalidRequestInputError } from '@talknest/errors/request';

import { validateCommandInput } from '../validate-command-input';
import {
  voteOnCommentInputSchema,
  voteOnPostInputSchema,
  type VoteOnCommentInput,
  type VoteOnPostInput,
} from './inputs';

// Vote On Comment
export class VoteOnCommentCommand {
  private constructor(public readonly props: VoteOnCommentInput) {}

  static create(input: unknown): Result<VoteOnCommentCommand, InvalidRequestInputError> {
    const inputOrError = validateCommandInput(voteOnCommentInputSchema, input);

    if (inputOrError.isFailure) {
      return fail(inputOrError.getError());
    }

    return success(new VoteOnCommentCommand(inputOrError.getValue()));
  }
}

// Vote On Post
export class VoteOnPostCommand {
  private constructor(public readonly props: VoteOnPostInput) {}

  static create(input: unknown): Result<VoteOnPostCommand, InvalidRequestInputError> {
    const inputOrError = validateCommandInput(voteOnPostInputSchema, input);

    if (inputOrError.isFailure) {
      return fail(inputOrError.getError());
    }

    return success(new VoteOnPostCommand(inputOrError.getValue()));
  }
}

// Initial Upvote On Post
type CastInitialUpvoteOnPostProps = {
  postId: string;
  memberId: string;
};

export class CastInitialUpvoteOnPostCommand {
  constructor(public readonly props: CastInitialUpvoteOnPostProps) {}
}

// Initial Upvote On Comment
type CastInitialUpvoteOnCommentProps = {
  commentId: string;
  memberId: string;
};

export class CastInitialUpvoteOnCommentCommand {
  constructor(public readonly props: CastInitialUpvoteOnCommentProps) {}
}
