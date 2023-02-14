import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';

import style from './appLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}
export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    to,
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props;

  return (
    <Link
      {...otherProps}
      to={to}
      className={classNames(style.appLink, {}, [className, style[theme]])}
    >
      {children}
    </Link>
  );
};
