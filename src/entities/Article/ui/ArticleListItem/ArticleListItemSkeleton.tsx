import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';

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
      off: () => style.articleListItem,
    });

    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });

    if (view === ArticleView.LIST) {
      const cardContent = (
        <>
          <div className={style.header}>
            <Skeleton border='50%' height={30} width={30} />
            <Skeleton width={150} height={16} className={style.username} />
            <Skeleton width={150} height={16} className={style.date} />
          </div>
          <Skeleton width={250} height={24} className={style.title} />
          <Skeleton height={200} className={style.img} />
          <div className={style.footer}>
            <Skeleton height={36} width={200} />
          </div>
        </>
      );
      return (
        <div className={classNames(mainClass, {}, [className, style[view]])}>
          <ToggleFeatures
            feature='isAppRedesigned'
            on={
              <CardRedesigned border='round' className={style.card}>
                {cardContent}
              </CardRedesigned>
            }
            off={
              <CardDeprecated className={style.card}>
                {cardContent}
              </CardDeprecated>
            }
          />
        </div>
      );
    }

    const cardContent = (
      <>
        <ToggleFeatures
          feature='isAppRedesigned'
          on={
            <Skeleton
              width='100%'
              height={150}
              border='32px'
              className={style.img}
            />
          }
          off={
            <div className={style.imageWrapper}>
              <Skeleton width={200} height={200} className={style.img} />
            </div>
          }
        />
        <div className={style.infoWrapper}>
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width={150} height={16} className={style.title} />
      </>
    );

    return (
      <div className={classNames(mainClass, {}, [className, style[view]])}>
        <ToggleFeatures
          feature='isAppRedesigned'
          on={
            <CardRedesigned border='round' className={style.card}>
              {cardContent}
            </CardRedesigned>
          }
          off={
            <CardDeprecated className={style.card}>
              {cardContent}
            </CardDeprecated>
          }
        />
      </div>
    );
  }
);
