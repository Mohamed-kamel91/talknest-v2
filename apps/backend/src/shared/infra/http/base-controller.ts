import { type Response, type CookieOptions } from 'express';

import { CustomError, type ErrorCode } from '@talknest/errors';
import {
  type FailureAPIResponse,
  type SuccessAPIResponse,
} from '@talknest/api';

import { CATEGORY_TO_STATUS } from './http-status';
import { toApiError } from './to-api-error';

export abstract class BaseController {
  public ok<T>(
    res: Response<SuccessAPIResponse<T>>,
    dto: T,
    status: 200 | 201 = 200,
  ) {
    return res.status(status).json({
      success: true,
      status,
      data: dto,
      error: null,
    });
  }

  public created<T>(res: Response<SuccessAPIResponse<T>>, dto: T) {
    return this.ok(res, dto, 201);
  }

  public fail(
    res: Response<FailureAPIResponse<ErrorCode>>,
    error: CustomError,
  ) {
    const status = CATEGORY_TO_STATUS[error.category];

    return res.status(status).json({
      success: false,
      status,
      data: null,
      error: toApiError(error),
    });
  }

  public noContent(res: Response) {
    return res.sendStatus(204);
  }

  public setCookie(
    res: Response,
    name: string,
    value: string,
    options: CookieOptions = {},
  ) {
    res.cookie(name, value, options);
  }

  public clearCookie(
    res: Response,
    name: string,
    options?: CookieOptions,
  ) {
    res.clearCookie(name, options);
  }

  public redirect(
    res: Response,
    url: string,
    status: 301 | 302 = 302,
  ) {
    return res.redirect(status, url);
  }

  public download(res: Response, path: string, filename?: string) {
    if (filename !== undefined) {
      return res.download(path, filename);
    }

    return res.download(path);
  }

  public sendFile(res: Response, path: string) {
    return res.sendFile(path);
  }
}
