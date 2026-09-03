import { z } from 'zod';

import {
  fail,
  success,
  type Result,
} from '@talknest/core/application';
import { TextUtil } from '@talknest/core/utils';
import { InvalidRequestInputError } from '@talknest/errors/request';

export function validateCommandInput<T>(
  schema: z.ZodType<T>,
  input: unknown,
): Result<T, InvalidRequestInputError> {
  const sanitizedInput = TextUtil.isObject(input) ? input : {};

  const result = schema.safeParse(sanitizedInput);

  if (!result.success) {
    const fieldErrors = toFieldErrors(result.error.issues);
    return fail(new InvalidRequestInputError(fieldErrors));
  }

  return success(result.data);
}

export function toFieldErrors(fieldErrors: z.core.$ZodIssue[]) {
  return fieldErrors.map((field) => ({
    field: field.path.join('.'),
    message: field.message,
  }));
}
