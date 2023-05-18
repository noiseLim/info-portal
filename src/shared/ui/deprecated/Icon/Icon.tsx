import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import style from './icon.module.scss';

interface IconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  inverted?: boolean;
}

/**
 * @deprecated
 */
export const Icon = memo((props: IconProps) => {
  const { className, Svg, inverted, ...otherProps } = props;

  return (
    <Svg
      {...otherProps}
      className={classNames(inverted ? style.inverted : style.icon, {}, [
        className,
      ])}
    />
  );
});
