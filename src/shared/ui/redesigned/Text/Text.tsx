/* eslint-disable no-unused-vars */
import { memo } from 'react';

import { Additional, classNames } from '@/shared/lib/classNames/classNames';

import style from './text.module.scss';

export type TextVariant = 'primary' | 'accent' | 'error';
export type TextAlign = 'left' | 'right' | 'center';
export type TextSize = 's' | 'm' | 'l';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;
  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
  s: 'size_s',
  m: 'size_m',
  l: 'size_l',
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    variant = 'primary',
    align = 'left',
    size = 'm',
    bold,
    'data-testid': dataTestId = 'Text',
  } = props;

  const sizeClass = mapSizeToClass[size];
  const HeaderTag = mapSizeToHeaderTag[size];

  const additional: Additional = [
    className,
    style[variant],
    style[align],
    sizeClass,
  ];

  return (
    <div
      className={classNames(
        style.textWrapper,
        { [style.bold]: bold },
        additional
      )}
    >
      {title && (
        <HeaderTag className={style.title} data-testid={`${dataTestId}.Header`}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p className={style.text} data-testid={`${dataTestId}.Paragraph`}>
          {text}
        </p>
      )}
    </div>
  );
});
