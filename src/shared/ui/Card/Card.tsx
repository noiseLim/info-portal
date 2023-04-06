import { HTMLAttributes, ReactNode } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import style from './card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}
export const Card = (props: CardProps) => {
  const { className, children, ...otherProps } = props;

  return (
    <div {...otherProps} className={classNames(style.card, {}, [className])}>
      {children}
    </div>
  );
};
