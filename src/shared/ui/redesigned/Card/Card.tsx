/* eslint-disable no-unused-vars */
import { HTMLAttributes, ReactNode } from 'react';

import {
  Additional,
  Mods,
  classNames,
} from '@/shared/lib/classNames/classNames';

import style from './card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'normal' | 'round';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  max?: boolean;
  padding?: CardPadding;
  border?: CardBorder;
}

const mapPaddintToClass: Record<CardPadding, string> = {
  0: 'padding_0',
  8: 'padding_8',
  16: 'padding_16',
  24: 'padding_24',
};

export const Card = (props: CardProps) => {
  const {
    className,
    children,
    variant = 'normal',
    max,
    padding = '8',
    border = 'regular',
    ...otherProps
  } = props;

  const paddingClass = mapPaddintToClass[padding];

  const mods: Mods = {
    [style.max]: max,
  };

  const additional: Additional = [
    className,
    style[variant],
    style[paddingClass],
    style[border],
  ];

  return (
    <div {...otherProps} className={classNames(style.card, mods, additional)}>
      {children}
    </div>
  );
};
