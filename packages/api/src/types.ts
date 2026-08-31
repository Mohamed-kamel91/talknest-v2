type FieldError = { field: string; message: string };

export type APIError<U extends string> = {
  code: U;
  message: string;
  fields?: FieldError[];
};

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
