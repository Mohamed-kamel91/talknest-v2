import { BadRequestError } from './application';

export type RequestError =
  | MissingRequestBodyError
  | InvalidRequestBodyError
  | MissingRequestQueryParamsError
  | InvalidRequestQueryParamsError
  | InvalidInputError;

export const requestErrorTypes = {
  MISSING_REQUEST_BODY: 'MISSING_REQUEST_BODY',
  INVALID_REQUEST_BODY: 'INVALID_REQUEST_BODY',
  MISSING_REQUEST_QUERY_PARAMS: 'MISSING_REQUEST_QUERY_PARAMS',
  INVALID_REQUEST_QUERY_PARAMS: 'INVALID_REQUEST_QUERY_PARAMS',
  INVALID_INPUT: 'INVALID_INPUT',
} as const;

export class MissingRequestBodyError extends BadRequestError<
  typeof requestErrorTypes.MISSING_REQUEST_BODY
> {
  constructor() {
    super(
      requestErrorTypes.MISSING_REQUEST_BODY,
      'Request body is missing',
    );
  }
}

export class InvalidRequestBodyError extends BadRequestError<
  typeof requestErrorTypes.INVALID_REQUEST_BODY
> {
  constructor(missingKeys: string[]) {
    super(
      requestErrorTypes.INVALID_REQUEST_BODY,
      'Body is missing required key: ' + missingKeys.join(', '),
    );
  }
}

export class MissingRequestQueryParamsError extends BadRequestError<
  typeof requestErrorTypes.MISSING_REQUEST_QUERY_PARAMS
> {
  constructor(missingparams: string[]) {
    super(
      requestErrorTypes.MISSING_REQUEST_QUERY_PARAMS,
      'Query is missing required params: ' + missingparams.join(', '),
    );
  }
}

export class InvalidRequestQueryParamsError extends BadRequestError<
  typeof requestErrorTypes.INVALID_REQUEST_QUERY_PARAMS
> {
  constructor(invalidParams: string[]) {
    super(
      requestErrorTypes.INVALID_REQUEST_QUERY_PARAMS,
      'Query has invalid params: ' + invalidParams.join(', '),
    );
  }
}

export class InvalidInputError extends BadRequestError<
  typeof requestErrorTypes.INVALID_INPUT
> {
  constructor(fields: string[]) {
    super(
      requestErrorTypes.INVALID_INPUT,
      'Invalid input: ' + fields.join(', '),
    );
  }
}
