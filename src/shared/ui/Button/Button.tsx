/* eslint-disable no-unused-vars */
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import style from './button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
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
}
export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme,
    square,
    size = ButtonSize.M,
    disabled,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [style.square]: square,
    [style.disabled]: disabled,
  };

  const additional: string[] = [className, style[theme], style[size]];

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
