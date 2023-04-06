import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import EyeIcon from 'shared/assets/icons/eye-20x20.svg';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import {
  ArtickleTextBlock,
  Article,
  ArticleBlockType,
  ArticleView,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import style from './articleListItem.module.scss';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view } = props;

  const { t } = useTranslation('article');

  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.article_details + article.id);
  }, [article.id, navigate]);

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
            <Button onClick={onOpenArticle}>{t('Read more')}</Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames('', {}, [className, style[view]])}>
      <Card className={style.card} onClick={onOpenArticle}>
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
    </div>
  );
});
