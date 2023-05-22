import { CSSProperties, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { AppImage } from '../../redesigned/AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import DefaultAvatar from '../../../assets/icons/user-avatar-filled-32-32.svg';

import style from './avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}

export const Avatar = (props: AvatarProps) => {
  const { className, src, alt, size = 100 } = props;

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );

  const fallback = <Skeleton width={size} height={size} border='50%' />;
  const errorFallback = <Icon Svg={DefaultAvatar} width={size} height={size} />;

  return (
    <AppImage
      className={classNames(style.avatar, {}, [className])}
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={styles}
    />
  );
};
