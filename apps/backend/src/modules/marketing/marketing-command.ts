import {
  InvalidRequestBodyError,
  MissingRequestBodyError,
} from '@talknest/errors/request';

import { getMissingKeys, isObject } from '../../shared/utils';

export class AddEmailToListCommand {
  private constructor(public email: string) {}

  static fromRequest(body: unknown) {
    if (!isObject<{ email: string }>(body)) {
      throw new MissingRequestBodyError();
    }

    const requiredKeys = ['email'];
    const missingKeys = getMissingKeys(body, requiredKeys);

    if (missingKeys.length > 0) {
      throw new InvalidRequestBodyError(requiredKeys);
    }

    return new AddEmailToListCommand(body.email);
  }
}
