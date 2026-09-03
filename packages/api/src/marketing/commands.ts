import { type InvalidRequestInputError } from '@talknest/errors/request';
import {
  success,
  fail,
  type Result,
} from '@talknest/core/application';

import { validateCommandInput } from '../validate-command-input';
import { AddEmailToListInput, addEmailToListSchema } from './inputs';

export class AddEmailToListCommand {
  private constructor(public readonly props: AddEmailToListInput) {}

  static create(
    input: unknown,
  ): Result<AddEmailToListCommand, InvalidRequestInputError> {
    const inputOrError = validateCommandInput(
      addEmailToListSchema,
      input,
    );

    if (inputOrError.isFailure) {
      return fail(inputOrError.getError());
    }

    return success(
      new AddEmailToListCommand(inputOrError.getValue()),
    );
  }
}
