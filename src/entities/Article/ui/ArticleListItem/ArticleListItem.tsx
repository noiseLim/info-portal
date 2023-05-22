import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import EyeIcon from '@/shared/assets/icons/eye-20x20.svg';
import { Text } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button } from '@/shared/ui/deprecated/Button';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

import { ArtickleTextBlock, Article } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import {
  ArticleBlockType,
  ArticleView,
} from '../../model/consts/articleConsts';

import style from './articleListItem.module.scss';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;

  const { t } = useTranslation('article');

  const types = <Text className={style.types} text={article.type.join(', ')} />;
  const views = (
    <>
      <Text className={style.views} text={String(article.views)} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArtickleTextBlock;

    return (
      <div
        className={classNames(style.articleListItem, {}, [
          className,
          style[view],
        ])}
        data-testid='ArticleListItem'
      >
        <Card className={style.card}>
          <div className={style.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text className={style.username} text={article.user.username} />
            <Text className={style.date} text={article.createdAt} />
          </div>
          <Text className={style.title} text={article.title} />
          {types}
          <AppImage
            className={style.img}
            fallback={<Skeleton width='100%' height={250} />}
            src={article.img}
            alt={article.title}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              className={style.textBlock}
              block={textBlock}
            />
          )}
          <div className={style.footer}>
            <AppLink to={getRouteArticleDetails(article.id)} target={target}>
              <Button>{t('Read more')}</Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      className={classNames('', {}, [className, style[view]])}
      to={getRouteArticleDetails(article.id)}
      target={target}
      data-testid='ArticleListItem'
    >
      <Card className={style.card}>
        <div className={style.imageWrapper}>
          <AppImage
            className={style.img}
            fallback={<Skeleton width={200} height={200} />}
            src={article.img}
            alt={article.title}
          />
          <Text className={style.date} text={article.createdAt} />
        </div>
        <div className={style.infoWrapper}>
          {types}
          {views}
        </div>
        <Text className={style.title} text={article.title} />
      </Card>
    </AppLink>
  );
});
