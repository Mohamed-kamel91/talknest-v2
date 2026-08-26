import { BadRequestError } from '../application';
import { requestErrorCodes } from './codes';

export type RequestError =
  | MissingRequestBodyError
  | InvalidRequestBodyError
  | MissingRequestQueryParamsError
  | InvalidRequestQueryParamsError
  | InvalidInputError;

export class MissingRequestBodyError extends BadRequestError<
  typeof requestErrorCodes.MISSING_REQUEST_BODY
> {
  constructor() {
    super(
      requestErrorCodes.MISSING_REQUEST_BODY,
      'Request body is missing',
    );
  }
}

export class InvalidRequestBodyError extends BadRequestError<
  typeof requestErrorCodes.INVALID_REQUEST_BODY
> {
  constructor(missingKeys: string[]) {
    super(
      requestErrorCodes.INVALID_REQUEST_BODY,
      'Body is missing required key: ' + missingKeys.join(', '),
    );
  }
}

export class MissingRequestQueryParamsError extends BadRequestError<
  typeof requestErrorCodes.MISSING_REQUEST_QUERY_PARAMS
> {
  constructor(missingparams: string[]) {
    super(
      requestErrorCodes.MISSING_REQUEST_QUERY_PARAMS,
      'Query is missing required params: ' + missingparams.join(', '),
    );
  }
}

export class InvalidRequestQueryParamsError extends BadRequestError<
  typeof requestErrorCodes.INVALID_REQUEST_QUERY_PARAMS
> {
  constructor(invalidParams: string[]) {
    super(
      requestErrorCodes.INVALID_REQUEST_QUERY_PARAMS,
      'Query has invalid params: ' + invalidParams.join(', '),
    );
  }
}

export class InvalidInputError extends BadRequestError<
  typeof requestErrorCodes.INVALID_INPUT
> {
  constructor(fields: string[]) {
    super(
      requestErrorCodes.INVALID_INPUT,
      'Invalid input: ' + fields.join(', '),
    );
  }
}
