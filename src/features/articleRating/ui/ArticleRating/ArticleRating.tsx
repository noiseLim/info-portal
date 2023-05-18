import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

import {
  useGetArticleRating,
  useRateArticle,
} from '../../api/articleRatingApi';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;

  const { t } = useTranslation();

  const userData = useSelector(getUserAuthData);
  const { data, isLoading } = useGetArticleRating({
    userId: userData?.id ?? '',
    articleId,
  });
  const [rateArticleMutation] = useRateArticle();

  const rating = data?.[0];

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? '',
          articleId,
          rate: starsCount,
          feedback,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [articleId, rateArticleMutation, userData?.id]
  );

  const onAccept = useCallback(
    (starsCount: number, feedbaack?: string) => {
      handleRateArticle(starsCount, feedbaack);
    },
    [handleRateArticle]
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle]
  );

  if (isLoading) {
    return <Skeleton width='100%' height={120} />;
  }

  return (
    <RatingCard
      className={className}
      title={t('Rate the article')}
      feedbackTitle={t('Feedbacd description')}
      rate={rating?.rate}
      onAccept={onAccept}
      onCancel={onCancel}
      hasFeedback
    />
  );
});

export default ArticleRating;
