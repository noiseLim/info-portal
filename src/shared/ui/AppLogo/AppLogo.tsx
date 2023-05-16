import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '../Stack';

import style from './appLogo.module.scss';
import AppSvg from '@/shared/assets/icons/app-image.svg';

interface AppLogoProps {
  className?: string;
}

export const AppLogo = memo((props: AppLogoProps) => {
  const { className } = props;

  return (
    <HStack
      max
      justify='center'
      className={classNames(style.appLogoWrapper, {}, [className])}
    >
      <div className={style.gradientBig} />
      <div className={style.gradientSmall} />
      <AppSvg className={style.appLogo} />
    </HStack>
  );
});
