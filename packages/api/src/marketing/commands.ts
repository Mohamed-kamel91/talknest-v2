import { TextUtil } from '@talknest/core/utils';
import {
  InvalidRequestBodyError,
  MissingRequestBodyError,
} from '@talknest/errors/request';

export class AddEmailToListCommand {
  private constructor(public email: string) {}

  static fromRequest(body: unknown) {
    if (!TextUtil.isObject<{ email: string }>(body)) {
      throw new MissingRequestBodyError();
    }

    const requiredKeys = ['email'];
    const missingKeys = TextUtil.getMissingKeys(body, requiredKeys);

    if (missingKeys.length > 0) {
      throw new InvalidRequestBodyError(requiredKeys);
    }

    return new AddEmailToListCommand(body.email);
  }
}
