import { z } from 'zod';

import { type Request, Result } from '@talknest/core/application';
import { InvalidRequestBodyError } from '@talknest/errors/request';
import { BadRequestError } from '@talknest/errors/application';

import type { CreatePostInput } from './types';
import { createPostSchema } from './schemas';

export class CreatePostCommand {
  private constructor(private readonly props: CreatePostInput) {}

  getProps(): CreatePostInput {
    return this.props;
  }

  static create(
    input: CreatePostInput,
  ): Result<CreatePostCommand, InvalidRequestBodyError> {
    try {
      const result = createPostSchema.parse(input);

      return Result.success(
        new CreatePostCommand(result as CreatePostInput),
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const invalidKeys = Object.keys(
          z.flattenError(error).fieldErrors,
        );

        return Result.failure(
          new InvalidRequestBodyError(invalidKeys),
        );
      }

      return Result.failure(new BadRequestError());
    }
  }

  static fromRequest(
    body: Request['body'],
  ): Result<CreatePostCommand, InvalidRequestBodyError> {
    const { title, postType, memberId } = body;

    if (!memberId) {
      return Result.failure(
        new InvalidRequestBodyError(['memberId']),
      );
    }

    if (!title) {
      return Result.failure(new InvalidRequestBodyError(['title']));
    }

    if (!postType) {
      return Result.failure(
        new InvalidRequestBodyError(['postType']),
      );
    }

    return Result.success(
      new CreatePostCommand({
        ...body,
      }),
    );
  }
}
