import { CSSProperties, useMemo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import defaultAvatar from '../../assets/icons/default-avatar.png';

import style from './avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}
export const Avatar = (props: AvatarProps) => {
  const { className, src, alt, size } = props;

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size || 100,
      height: size || 100,
    }),
    [size]
  );

  return (
    <img
      className={classNames(style.avatar, {}, [className])}
      src={src || defaultAvatar}
      alt={alt}
      style={styles}
    />
  );
};
