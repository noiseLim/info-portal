import { CSSProperties, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { AppImage } from '../AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import DefaultAvatar from '../../../assets/icons/user-avatar-filled-32-32.svg';

import style from './avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
  fallbackInverted?: boolean;
}

/**
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
  const { className, src, alt, size = 100, fallbackInverted } = props;

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );

  const fallback = <Skeleton width={size} height={size} border='50%' />;
  const errorFallback = (
    <Icon
      Svg={DefaultAvatar}
      width={size}
      height={size}
      inverted={fallbackInverted}
    />
  );

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
