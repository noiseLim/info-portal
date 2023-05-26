import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';

import { useGetArticleRecommendationsList } from '../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;

    const { t } = useTranslation('article-details');

    const {
      isLoading,
      data: articles,
      error,
    } = useGetArticleRecommendationsList(3);

    if (isLoading || error || !articles) {
      return null;
    }

    return (
      <VStack
        gap='8'
        className={classNames('', {}, [className])}
        data-testid='ArticleRecommendationsList'
      >
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<Text title={t('We recommend')} size='l' />}
          off={<TextDeprecated title={t('We recommend')} size={TextSize.L} />}
        />
        <ArticleList articles={articles} target='_blank' />
      </VStack>
    );
  }
);
