import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

import style from './articleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.TILE ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={style.card} key={index} view={view} />
    ));
};

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view = ArticleView.TILE } = props;

  if (isLoading) {
    return (
      <div className={classNames('', {}, [className, style[view]])}>
        {getSkeletons(view)}
      </div>
    );
  }

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem
        className={style.card}
        article={article}
        view={view}
        key={article.id}
      />
    );
  };

  return (
    <div className={classNames('', {}, [className, style[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
    </div>
  );
});
