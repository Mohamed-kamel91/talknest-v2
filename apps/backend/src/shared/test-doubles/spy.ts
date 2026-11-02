type MethodNames<T> = keyof T;

interface Call<T> {
  methodName: MethodNames<T>;
  args: any[];
  context?: any;
}

export abstract class Spy<T> {
  protected calls: Call<T>[];

  constructor() {
    this.calls = [];
  }

  protected addCall<MethodName extends MethodNames<T>>(
    methodName: MethodName,
    args: any[],
    context?: any,
  ) {
    const call: Call<T> = {
      methodName,
      args,
      context,
    };

    this.calls.push(call);
  }

  public getTimesMethodCalled<MethodName extends MethodNames<T>>(methodName: MethodName) {
    const calls = this.calls.filter((call) => call.methodName === methodName);

    return calls.length;
  }

  public wasMethodCalled<MethodName extends MethodNames<T>>(methodName: MethodName): boolean {
    return this.calls.some((call) => call.methodName === methodName);
  }

  public getCalls() {
    return this.calls;
  }

  public getMethodCall<MethodName extends MethodNames<T>>(methodName: MethodName) {
    return this.calls.find((c) => c.methodName === methodName);
  }

  public getMethodCallArgs<MethodName extends MethodNames<T>>(methodName: MethodName) {
    const call = this.getMethodCall(methodName);

    if (!call) {
      throw new Error(`Expected "${String(methodName)}" to have been called, but it was not`);
    }

    return call.args;
  }

  public reset() {
    this.calls = [];
  }
}
