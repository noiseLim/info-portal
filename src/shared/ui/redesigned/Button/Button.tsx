/* eslint-disable no-unused-vars */
import {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from 'react';

import {
  Additional,
  classNames,
  Mods,
} from '@/shared/lib/classNames/classNames';

import style from './button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';
export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  color?: ButtonColor;
}

export const Button = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      className,
      children,
      variant = 'outline',
      square,
      size = 'm',
      disabled,
      fullWidth,
      addonLeft,
      addonRight,
      color = 'normal',
      ...otherProps
    } = props;

    const mods: Mods = {
      [style.square]: square,
      [style.disabled]: disabled,
      [style.fullWidth]: fullWidth,
      [style.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    const additional: Additional = [
      className,
      style[variant],
      style[size],
      style[color],
    ];

    return (
      <button
        {...otherProps}
        type='button'
        className={classNames(style.button, mods, additional)}
        disabled={disabled}
        ref={ref}
      >
        <div className={style.addonLeft}>{addonLeft}</div>
        {children}
        <div className={style.addonRight}>{addonRight}</div>
      </button>
    );
  }
);
