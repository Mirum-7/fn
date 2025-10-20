export interface Props<TArgs extends unknown[] = unknown[]> {
  fn: (...args: TArgs) => Promise<void> | void;
  /**
   * @default 1000
   */
  wait?: number;
}

export interface ReturnProps<TArgs extends unknown[] = unknown[]> {
  fn: (...args: TArgs) => Promise<void>;
  clear: () => void;
}

export const debounce = <TArgs extends unknown[] = unknown[]>(
  props: Props<TArgs>
): ReturnProps<TArgs> => {
  const { fn: func, wait = 1000 } = props;

  let timeoutId: ReturnType<typeof setTimeout>;

  const clear = () => {
    clearTimeout(timeoutId);
  };

  const fn = (...args: TArgs) => {
    clear();

    return new Promise<void>((resolve) => {
      timeoutId = setTimeout(async () => {
        await func(...args);
        resolve();
      }, wait);
    });
  };

  return {
    fn,
    clear,
  };
};
