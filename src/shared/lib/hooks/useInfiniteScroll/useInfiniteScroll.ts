import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollOptions) {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const triggerElement = triggerRef.current;
    const wrapperElement = wrapperRef.current;

    let observer: IntersectionObserver | null = null;

    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: '1px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(triggerElement);

      return () => {
        if (observer && triggerElement) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          observer.unobserve(triggerElement);
        }
      };
    }
  }, [callback, triggerRef, wrapperRef]);
}
