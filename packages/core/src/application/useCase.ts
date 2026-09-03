export interface UseCase<Request, Response> {
  execute(request: Request): Promise<Response>;
}

interface SuccessResponse<T> {
  readonly success: true;
  readonly value: T;
}

interface FailureResponse<E> {
  readonly success: false;
  readonly error: E;
}

export type ResultResponse<T, E> =
  SuccessResponse<T> | FailureResponse<E>;

export class Result<T, E> {
  private constructor(
    private readonly response: ResultResponse<T, E>,
  ) {}

  get isSuccess(): boolean {
    return this.response.success;
  }

  get isFailure(): boolean {
    return !this.response.success;
  }

  public getValue(): T {
    const res = this.response;
    if (!res.success) {
      throw new Error('Cannot get value from failed response');
    }
    return res.value;
  }

  public getError(): E {
    const res = this.response;
    if (res.success) {
      throw new Error('Cannot get error from successful response');
    }
    return res.error;
  }

  static success<T, E = never>(value: T): Result<T, E> {
    return new Result<T, E>({ success: true, value });
  }

  static fail<E, T = never>(error: E): Result<T, E> {
    return new Result<T, E>({ success: false, error });
  }

  public match<R>(
    onSuccess: (value: T) => R,
    onFailure: (error: E) => R,
  ): R {
    const res = this.response;
    if (res.success) {
      return onSuccess(res.value);
    }
    return onFailure(res.error);
  }
}

// Helper functions
export function fail<T, E>(error: E): Result<T, E> {
  return Result.fail(error);
}

export function success<T, E>(value: T): Result<T, E> {
  return Result.success(value);
}
