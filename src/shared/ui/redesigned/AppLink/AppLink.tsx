/* eslint-disable no-unused-vars */
import { memo, ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import style from './appLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
  activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    to,
    className,
    children,
    variant = 'primary',
    activeClassName = '',
    ...otherProps
  } = props;

  return (
    <NavLink
      className={({ isActive }) =>
        classNames('', { [activeClassName]: isActive }, [
          className,
          style[variant],
        ])
      }
      {...otherProps}
      to={to}
    >
      {children}
    </NavLink>
  );
});
