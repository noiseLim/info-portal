import { useCallback, useRef } from 'react';

export function useTrottle(callback: (...args: any[]) => void, delay: number) {
  const trottleRef = useRef(false);

  return useCallback(
    (...args: any[]) => {
      if (!trottleRef.current) {
        callback(...args);
        trottleRef.current = true;

        setTimeout(() => {
          trottleRef.current = false;
        }, delay);
      }
    },
    [callback, delay]
  );
}
