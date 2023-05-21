/* eslint-disable no-unused-vars */
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

import {
  Additional,
  classNames,
  Mods,
} from '@/shared/lib/classNames/classNames';

import style from './button.module.scss';

export type ButtonVariant = 'clear' | 'outline';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: string;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    variant = 'outline',
    square,
    size = 'm',
    disabled,
    fullWidth,
    ...otherProps
  } = props;

  const mods: Mods = {
    [style.square]: square,
    [style.disabled]: disabled,
    [style.fullWidth]: fullWidth,
  };

  const additional: Additional = [className, style[variant], style[size]];

  return (
    <button
      {...otherProps}
      type='button'
      className={classNames(style.button, mods, additional)}
      disabled={disabled}
    >
      {children}
    </button>
  );
});
