/* eslint-disable no-unused-vars */
import { memo } from 'react';

import { Additional, classNames } from 'shared/lib/classNames/classNames';

import style from './text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  ERROR = 'error',
}

export enum TextAlign {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];

  const additional: Additional = [
    className,
    style[theme],
    style[align],
    style[size],
  ];

  return (
    <div className={classNames(style.textWrapper, {}, additional)}>
      {title && <HeaderTag className={style.title}>{title}</HeaderTag>}
      {text && <p className={style.text}>{text}</p>}
    </div>
  );
});
