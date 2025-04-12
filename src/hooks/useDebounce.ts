import { useCallback, useRef } from 'react';

export function useDebounce(callback: Function, delay: number = 100, onDebounce?: Function) {
  const timeout = useRef<SetTimeoutValue | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      onDebounce?.();
      timeout.current = setTimeout(callback.bind(null, ...args), delay);
    },
    [callback, onDebounce, delay],
  );

  return debouncedCallback;
}
