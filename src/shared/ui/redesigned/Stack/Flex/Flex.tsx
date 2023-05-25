import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import style from './flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'normal' | 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'nowrap' | 'wrap';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

const justifyClasses: Record<FlexJustify, string> = {
  start: style.justifyStart,
  center: style.justifyCenter,
  end: style.justifyEnd,
  between: style.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  normal: style.alignNormal,
  start: style.alignStart,
  center: style.alignCenter,
  end: style.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
  row: style.directionRow,
  column: style.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  4: style.gap4,
  8: style.gap8,
  16: style.gap16,
  24: style.gap24,
  32: style.gap32,
};

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  wrap?: FlexWrap;
  gap?: FlexGap;
  max?: boolean;
}

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    wrap = 'nowrap',
    gap,
    max,
    ...otherProps
  } = props;

  const mods = {
    [style.max]: max,
  };

  const additional = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
    style[wrap],
  ];

  return (
    <div {...otherProps} className={classNames(style.flex, mods, additional)}>
      {children}
    </div>
  );
};
