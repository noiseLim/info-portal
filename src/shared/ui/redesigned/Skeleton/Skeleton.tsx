import { CSSProperties, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import style from './skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string | number;
}

export const Skeleton = memo((props: SkeletonProps) => {
  const { className, height, width, border = '4px' } = props;

  const styles: CSSProperties = {
    height,
    width,
    borderRadius: border,
  };

  return (
    <div
      className={classNames(style.skeleton, {}, [className])}
      style={styles}
    />
  );
});
