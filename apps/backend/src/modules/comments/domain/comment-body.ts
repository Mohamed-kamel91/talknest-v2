import {
  success,
  fail,
  type Result,
  ValueObject,
} from '@talknest/core';

import {
  CommentBodyEmptyError,
  CommentBodyTooLongError,
} from './errors/comment-errors';

type CommentBodyProps = {
  value: string;
};

export class CommentBody extends ValueObject<CommentBodyProps> {
  public static readonly MAX_LENGTH = 1000;

  private constructor(props: CommentBodyProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(
    value: string,
  ): Result<
    CommentBody,
    CommentBodyEmptyError | CommentBodyTooLongError
  > {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      return fail(new CommentBodyEmptyError());
    }

    if (trimmed.length > CommentBody.MAX_LENGTH) {
      return fail(
        new CommentBodyTooLongError(CommentBody.MAX_LENGTH),
      );
    }

    return success(new CommentBody({ value: trimmed }));
  }

  public static reconstitute(value: string): CommentBody {
    return new CommentBody({ value });
  }
}
