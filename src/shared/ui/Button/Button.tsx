/* eslint-disable no-unused-vars */
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

import {
  Additional,
  classNames,
  Mods,
} from '@/shared/lib/classNames/classNames';

import style from './button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
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
    theme = ButtonTheme.OUTLINE,
    square,
    size = ButtonSize.M,
    disabled,
    fullWidth,
    ...otherProps
  } = props;

  const mods: Mods = {
    [style.square]: square,
    [style.disabled]: disabled,
    [style.fullWidth]: fullWidth,
  };

  const additional: Additional = [className, style[theme], style[size]];

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
