import { z } from 'zod';

import { ValueObject } from '@talknest/core/domain';
import {
  success,
  fail,
  type Result,
} from '@talknest/core/application';
import { InvalidPostTypeError } from './errors/posts-errors';

export const postTypeSchema = z.enum(
  ['text', 'link'],
  'Post type must be either text or link',
);

export type PostTypeValue = z.infer<typeof postTypeSchema>;

type PostTypeProps = {
  value: PostTypeValue;
};

export class PostType extends ValueObject<PostTypeProps> {
  private constructor(props: PostTypeProps) {
    super(props);
  }

  get value(): PostTypeValue {
    return this.props.value;
  }

  public static create(
    value: PostTypeValue,
  ): Result<PostType, InvalidPostTypeError> {
    const result = postTypeSchema.safeParse(value);

    if (!result.success) {
      const message = result.error.issues[0]?.message;
      return fail(new InvalidPostTypeError(value, message));
    }

    return success(new PostType({ value: result.data }));
  }

  public static reconstitute(value: PostTypeValue) {
    return new PostType({ value });
  }
}
