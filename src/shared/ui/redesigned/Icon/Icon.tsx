import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import style from './icon.module.scss';

type SvgProps = Omit<React.SVGAttributes<SVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

interface NonClicableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClicableIconProps extends IconBaseProps {
  clickable: true;
  onClick: () => void;
}

type IconProps = NonClicableIconProps | ClicableIconProps;

export const Icon = memo((props: IconProps) => {
  const {
    className,
    Svg,
    clickable,
    width = 32,
    height = 32,
    ...otherProps
  } = props;

  const icon = (
    <Svg
      {...otherProps}
      className={classNames(style.icon, {}, [className])}
      width={width}
      height={height}
      onClick={undefined}
    />
  );

  if (clickable) {
    return (
      <button
        type='button'
        className={style.button}
        onClick={props.onClick}
        style={{ height, width }}
      >
        {icon}
      </button>
    );
  }

  return icon;
});
