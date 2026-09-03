import {
  fail,
  success,
  type Result,
} from '@talknest/core/application';
import { type InvalidRequestInputError } from '@talknest/errors/request';

import { type DecodedIdToken } from '../users';
import { validateCommandInput } from '../validate-command-input';
import {
  createMemberInputSchema,
  type CreateMemberInput,
} from './inputs';

export class CreateMemberCommand {
  private constructor(public readonly props: CreateMemberInput) {}

  static create(
    input: unknown,
  ): Result<CreateMemberCommand, InvalidRequestInputError> {
    const inputOrError = validateCommandInput(
      createMemberInputSchema,
      input,
    );

    if (inputOrError.isFailure) {
      return fail(inputOrError.getError());
    }

    return success(new CreateMemberCommand(inputOrError.getValue()));
  }
}
