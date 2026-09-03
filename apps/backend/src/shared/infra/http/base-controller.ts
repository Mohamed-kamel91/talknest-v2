import express from 'express';

import {
  CustomError,
  FieldError,
  ValidationError,
  type ErrorCode,
} from '@talknest/errors';
import {
  APIError,
  type FailureAPIResponse,
  type SuccessAPIResponse,
} from '@talknest/api';

import { CATEGORY_TO_STATUS } from './http-status';

export abstract class BaseController {
  public ok<T>(
    res: express.Response<SuccessAPIResponse<T>>,
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

  public created<T>(
    res: express.Response<SuccessAPIResponse<T>>,
    dto: T,
  ) {
    return this.ok(res, dto, 201);
  }

  public fail<E extends ErrorCode>(
    res: express.Response<FailureAPIResponse<ErrorCode>>,
    error: CustomError,
  ) {
    const status = CATEGORY_TO_STATUS[error.category];

    if (
      error instanceof ValidationError &&
      error.fieldErrors?.length
    ) {
      return res.status(status).json({
        success: false,
        status,
        data: null,
        error: {
          code: error.code,
          message: error.message,
          fields: error.fieldErrors,
        },
      } as FailureAPIResponse<E>);
    }

    return res.status(status).json({
      success: false,
      status,
      data: null,
      error: {
        code: error.code,
        message: error.message,
      } as Exclude<APIError<ErrorCode>, { fields: FieldError[] }>,
    });
  }

  public noContent(res: express.Response) {
    return res.sendStatus(204);
  }

  public setCookie(
    res: express.Response,
    name: string,
    value: string,
    options: express.CookieOptions = {},
  ) {
    res.cookie(name, value, options);
  }

  public clearCookie(
    res: express.Response,
    name: string,
    options?: express.CookieOptions,
  ) {
    res.clearCookie(name, options);
  }

  public redirect(
    res: express.Response,
    url: string,
    status: 301 | 302 = 302,
  ) {
    return res.redirect(status, url);
  }

  public download(
    res: express.Response,
    path: string,
    filename?: string,
  ) {
    if (filename !== undefined) {
      return res.download(path, filename);
    }

    return res.download(path);
  }

  public sendFile(res: express.Response, path: string) {
    return res.sendFile(path);
  }
}
