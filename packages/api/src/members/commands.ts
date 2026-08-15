import {
  type Request,
  Result,
  fail,
  success,
} from '@talknest/core/application';
import { InvalidRequestBodyError } from '@talknest/errors/request';

import type { CreateMemberInput } from './types';
import { type DecodedIdToken } from '../users';

export class CreateMemberCommand {
  private constructor(public readonly props: CreateMemberInput) {}

  static create(
    decodedToken: DecodedIdToken | undefined,
    body: Request['body'],
  ): Result<CreateMemberCommand, InvalidRequestBodyError> {
    const email = decodedToken?.email || body.email;
    const userId = decodedToken?.uid || body.userId;
    const username = body.username;

    if (!email) {
      return fail(new InvalidRequestBodyError(['email']));
    }

    if (!userId) {
      return fail(new InvalidRequestBodyError(['userId']));
    }

    if (!username) {
      return fail(new InvalidRequestBodyError(['username']));
    }

    return success(
      new CreateMemberCommand({
        userId,
        username,
        email,
      }),
    );
  }

  static fromRequest(
    decodedToken: DecodedIdToken | undefined,
    body: Request['body'],
  ): Result<CreateMemberCommand, InvalidRequestBodyError> {
    return this.create(decodedToken, body);
  }
}
