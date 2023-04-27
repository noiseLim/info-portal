import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';

import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleView } from '../../model/consts/articleConsts';

import style from './articleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.TILE ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={style.card} key={index} view={view} />
    ));
};

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.TILE,
    target,
  } = props;

  const { t } = useTranslation('article');

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem
        className={style.card}
        article={article}
        view={view}
        key={article.id}
        target={target}
      />
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames('', {}, [className, style[view]])}>
        <Text size={TextSize.L} text={t('Articles not found')} />
      </div>
    );
  }

  return (
    <div className={classNames('', {}, [className, style[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
