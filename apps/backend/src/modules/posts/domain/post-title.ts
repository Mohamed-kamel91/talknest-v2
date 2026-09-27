import { z } from 'zod';

import { ValueObject } from '@talknest/core/domain';
import {
  success,
  fail,
  type Result,
} from '@talknest/core/application';

import { InvalidPostTitleError } from './errors/posts-errors';

const postTitleSchema = z
  .string()
  .min(5, 'Title must be at least 5 characters')
  .max(100, 'Title must not exceed 100 characters');

type PostTitleProps = {
  value: string;
};

export class PostTitle extends ValueObject<PostTitleProps> {
  private constructor(props: PostTitleProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(
    value: string,
  ): Result<PostTitle, InvalidPostTitleError> {
    const result = postTitleSchema.safeParse(value);

    if (!result.success) {
      return fail(
        new InvalidPostTitleError(result.error.issues[0]?.message),
      );
    }

    return success(
      new PostTitle({
        value: result.data,
      }),
    );
  }

  public static reconstitute(value: string) {
    return new PostTitle({ value });
  }
}
