import { classNames } from '@/shared/lib/classNames/classNames';
import style from './loader.module.scss';

interface LoaderProps {
  className?: string;
}
export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={classNames(style['lds-ring'], {}, [className])}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
