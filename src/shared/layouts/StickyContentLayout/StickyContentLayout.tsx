import { memo, ReactElement } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import style from './stickyContentLayout.module.scss';

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactElement;
  content: ReactElement;
  right?: ReactElement;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
  const { className, content, left, right } = props;

  return (
    <div className={classNames(style.mainLayout, {}, [className])}>
      {right && <div className={style.left}>{left}</div>}
      <div className={style.content}>{content}</div>
      {left && <div className={style.right}>{right}</div>}
    </div>
  );
});
