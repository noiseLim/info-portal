import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/const/router';

import style from './additionalInfoContainer.module.scss';

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticleDetailsData);
  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [article, navigate]);

  if (!article) return null;

  return (
    <Card className={style.card} padding='24' border='partial'>
      <ArticleAdditionalInfo
        author={article.user}
        createdAd={article.createdAt}
        views={article.views}
        onEdit={onEditArticle}
      />
    </Card>
  );
});
