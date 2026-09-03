import { errorCategories } from '@talknest/errors';
import { type FieldError } from '@talknest/errors/application';

export type APIError<U extends string> =
  U extends typeof errorCategories.VALIDATION
    ? { message: string; code: U; fields: FieldError[] }
    : { message: string; code: U; fields?: never };

export type SuccessAPIResponse<Data> = {
  success: true;
  data: Data;
  status: number;
  error: null;
};

export type FailureAPIResponse<ErrorCode extends string> = {
  success: false;
  data: null;
  status?: number;
  error: APIError<ErrorCode>;
};

export type APIResponse<T, U extends string> =
  SuccessAPIResponse<T> | FailureAPIResponse<U>;
