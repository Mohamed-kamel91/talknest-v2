import { z } from 'zod';

import { ValueObject } from '@talknest/core/domain';
import {
  success,
  fail,
  type Result,
} from '@talknest/core/application';

import { InvalidPostLinkError } from './errors/posts-errors';

const postLinkSchema = z.url('Post link must be a valid URL');

type PostLinkProps = {
  value: string;
};

export class PostLink extends ValueObject<PostLinkProps> {
  private constructor(props: PostLinkProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(
    value: string,
  ): Result<PostLink, InvalidPostLinkError> {
    const result = postLinkSchema.safeParse(value);

    if (!result.success) {
      return fail(
        new InvalidPostLinkError(result.error.issues[0]?.message),
      );
    }

    return success(
      new PostLink({
        value: result.data,
      }),
    );
  }

  public static reconstitute(value: string) {
    return new PostLink({ value });
  }
}
