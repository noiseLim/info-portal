import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import EyeIcon from '@/shared/assets/icons/eye-20x20.svg';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/AppLink';

import { ArtickleTextBlock, Article } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import {
  ArticleBlockType,
  ArticleView,
} from '../../model/consts/articleConsts';

import style from './articleListItem.module.scss';

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
      >
        <Card className={style.card}>
          <div className={style.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text className={style.username} text={article.user.username} />
            <Text className={style.date} text={article.createdAt} />
          </div>
          <Text className={style.title} text={article.title} />
          {types}
          <img className={style.img} src={article.img} alt={article.title} />
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
    >
      <Card className={style.card}>
        <div className={style.imageWrapper}>
          <img className={style.img} src={article.img} alt={article.title} />
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
