import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Card } from 'shared/ui/Card/Card';

import { ArticleView } from '../../model/consts/articleConsts';

import style from './articleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    if (view === ArticleView.LIST) {
      return (
        <div
          className={classNames(style.articleListItem, {}, [
            className,
            style[view],
          ])}
        >
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
      <div className={classNames('', {}, [className, style[view]])}>
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
