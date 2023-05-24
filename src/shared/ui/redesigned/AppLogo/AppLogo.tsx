import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import AppSvg from '@/shared/assets/icons/app-image.svg';

import { HStack } from '../Stack';

import style from './appLogo.module.scss';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
  const { className, size = 50 } = props;

  return (
    <HStack
      max
      justify='center'
      className={classNames(style.appLogoWrapper, {}, [className])}
    >
      <AppSvg
        className={style.appLogo}
        width={size}
        height={size}
        color='black'
      />
      <div className={style.gradientBig} />
      <div className={style.gradientSmall} />
    </HStack>
  );
});
