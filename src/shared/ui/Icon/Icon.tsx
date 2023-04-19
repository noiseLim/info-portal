import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import style from './icon.module.scss';

interface IconProps {
  className?: string;
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg, inverted } = props;

  return (
    <Svg
      className={classNames(inverted ? style.inverted : style.icon, {}, [
        className,
      ])}
    />
  );
});
