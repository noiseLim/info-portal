import { ReactElement, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import style from './mainLayout.module.scss';

interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar: ReactElement;
  toolbar?: ReactElement;
}
export const MainLayout = memo((props: MainLayoutProps) => {
  const { className, header, content, sidebar, toolbar } = props;

  return (
    <div className={classNames(style.mainLayout, {}, [className])}>
      <div className={style.sidebar}>{sidebar}</div>
      <div className={style.content}>{content}</div>
      <div className={style.rightbar}>
        <div className={style.header}>{header}</div>
        <div className={style.toolbar}>{toolbar}</div>
      </div>
    </div>
  );
});
