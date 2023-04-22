import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import style from './overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props;

  return (
    <div
      className={classNames(style.overlay, {}, [className])}
      onClick={onClick}
    />
  );
});
