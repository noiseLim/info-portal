import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { toggleFeatures } from '@/shared/lib/features';

import { ArticleView } from '../../model/consts/articleConsts';

import style from './articleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    const mainClass = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => style.articleListItemRedesigned,
      off: () => style.articleListItemDeprecated,
    });

    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });

    const Card = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => CardRedesigned,
      off: () => CardDeprecated,
    });

    if (view === ArticleView.LIST) {
      return (
        <div className={classNames(mainClass, {}, [className, style[view]])}>
          <Card className={style.card}>
            <div className={style.header}>
              <Skeleton width={30} height={30} border='50%' />
              <Skeleton width={150} height={16} className={style.username} />
              <Skeleton width={150} height={16} className={style.date} />
            </div>
            <Skeleton width={150} height={24} className={style.title} />
            <Skeleton height={200} className={style.img} />

            <div className={style.footer}>
              <Skeleton width={200} height={36} />
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className={classNames(mainClass, {}, [className, style[view]])}>
        <Card className={style.card}>
          <div className={style.imageWrapper}>
            <Skeleton width={200} height={200} className={style.img} />
          </div>
          <div className={style.infoWrapper}>
            <Skeleton width={130} height={16} />
          </div>
          <Skeleton width={150} height={16} className={style.title} />
        </Card>
      </div>
    );
  }
);
