import { MutableRefObject, ReactNode, useRef, UIEvent } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getScrollRestorationByPath,
  scrollRestorationActions,
} from '@/features/ScrollRestoration';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useTrottle } from '@/shared/lib/hooks/useTrottle/useTrottle';
import { TestProps } from '@/shared/types/tests';
import { toggleFeatures } from '@/shared/lib/features';

import style from './page.module.scss';
import styleRedesigned from './pageRedesigned.module.scss';

interface PageProps extends TestProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = (props: PageProps) => {
  const { className, children, onScrollEnd } = props;

  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { pathname } = useLocation();

  const scrollPosition = useSelector((state: StateSchema) =>
    getScrollRestorationByPath(state, pathname)
  );

  const dispatch = useAppDispatch();

  useInfiniteScroll({
    triggerRef,
    wrapperRef: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => undefined,
      off: () => wrapperRef,
    }),
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useTrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      scrollRestorationActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname,
      })
    );
  }, 500);

  return (
    <main
      className={classNames(
        toggleFeatures({
          name: 'isAppRedesigned',
          on: () => styleRedesigned.page,
          off: () => style.page,
        }),
        {},
        [className]
      )}
      ref={wrapperRef}
      onScroll={onScroll}
      id={PAGE_ID}
      // eslint-disable-next-line react/destructuring-assignment
      data-testid={props['data-testid'] ?? 'Page'}
    >
      {children}
      {onScrollEnd ? <div className={style.trigger} ref={triggerRef} /> : null}
    </main>
  );
};
