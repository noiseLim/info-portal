import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleDetails } from '@/entities/Article';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { ArticleRating } from '@/features/articleRating';
import { getFeatureFlags } from '@/shared/lib/features';

import { articleDetailsCommentsReducer } from '../../model/slices/articleDetailsCommentsSlice';
import ArticleDetailsPageHeader from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';

import style from './articleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { id } = useParams<{ id: string }>();

  const isArticleRatingEnabled = getFeatureFlags('isArticleRatingEnabled');
  const isArticleRecommendationsList = getFeatureFlags(
    'isArticleRecommendationsList'
  );

  if (!id) {
    return null;
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(style.articleDetailsPage, {}, [className])}>
        <VStack gap='16' max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          {isArticleRatingEnabled ?? <ArticleRating articleId={id} />}
          {isArticleRecommendationsList ?? <ArticleRecommendationsList />}
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
