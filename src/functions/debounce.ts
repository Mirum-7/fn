interface Props<TArgs extends unknown[] = unknown[]> {
  fn: (...args: TArgs) => void;
  /**
   * @default 1000
   */
  wait?: number;
}

interface ReturnProps<TArgs extends unknown[] = unknown[]> {
  fn: (...args: TArgs) => void;
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

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };

  return {
    fn,
    clear,
  };
};
