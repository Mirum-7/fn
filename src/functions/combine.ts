type Pipe<F extends readonly unknown[]> = F extends readonly [
  infer First,
  ...infer Rest
]
  ? First extends (...args: infer A) => infer B
    ? Rest extends readonly []
      ? (...args: A) => B
      : Rest extends readonly [(arg: B) => any, ...any[]]
      ? Pipe<Rest> extends (...args: any[]) => infer C
        ? (...args: A) => C
        : never
      : never
    : never
  : never;

type ValidPipe<F extends readonly unknown[]> = F extends readonly [
  infer First,
  ...infer Rest
]
  ? First extends (...args: any[]) => infer B
    ? Rest extends readonly []
      ? true
      : Rest extends readonly [infer Second, ...infer RestTail]
      ? Second extends (arg: B) => any
        ? ValidPipe<Rest>
        : false
      : false
    : false
  : false;

export const combine = <
  F extends readonly [(...args: any[]) => any, ...Array<(arg: any) => any>]
>(
  ...fns: ValidPipe<F> extends true ? F : never
): Pipe<F> => {
  return ((...args: any[]): any => {
    if (fns.length === 0) return args;

    let result: any = fns[0](...args);

    for (let i = 1; i < fns.length; i++) {
      result = fns[i]?.(result);
    }

    return result;
  }) as Pipe<F>;
};
