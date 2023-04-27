import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/Loader';

import style from './pageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}
export const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <div className={classNames(style.pageLoader, {}, [className])}>
      <Loader />
    </div>
  );
};
