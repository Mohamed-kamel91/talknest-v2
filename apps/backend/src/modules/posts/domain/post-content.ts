import { z } from 'zod';

import { ValueObject } from '@talknest/core/domain';
import {
  success,
  fail,
  type Result,
} from '@talknest/core/application';

import { InvalidPostContentError } from './errors/posts-errors';

const postContentSchema = z
  .string()
  .min(1, 'Post content cannot be empty')
  .max(3000, 'Post content must not exceed 3000 characters');

type PostContentProps = {
  value: string;
};

export class PostContent extends ValueObject<PostContentProps> {
  private constructor(props: PostContentProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(
    value: string,
  ): Result<PostContent, InvalidPostContentError> {
    const result = postContentSchema.safeParse(value);

    if (!result.success) {
      return fail(
        new InvalidPostContentError(result.error.issues[0]?.message),
      );
    }

    return success(
      new PostContent({
        value: result.data,
      }),
    );
  }

  public static reconstitute(value: string) {
    return new PostContent({ value });
  }
}
