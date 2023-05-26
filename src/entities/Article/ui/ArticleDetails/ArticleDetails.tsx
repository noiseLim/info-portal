import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Text as TextDeprecated,
  TextAlign,
  TextSize,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import EyeIcon from '@/shared/assets/icons/eye-20x20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20x20.svg';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

import { getArticleDetailsData } from '../../model/selectors/getArticleDetailsData/getArticleDetailsData';
import { getArticleDetailsError } from '../../model/selectors/getArticleDetailsError/getArticleDetailsError';
import { getArticleDetailsIsLoading } from '../../model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { renderArticleBlock } from './renderArticleBlock';

import style from './articleDetails.module.scss';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const Redesigned = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <Text title={article?.title} size='l' bold />
      <Text title={article?.subtitle} />
      <AppImage
        className={style.img}
        fallback={<Skeleton width='100%' height={420} border='16px' />}
        src={article?.img}
      />
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

const Deprecated = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <HStack justify='center' max data-testid='ArticleDetails.info'>
        <Avatar className={style.avatar} size={200} src={article?.img} />
      </HStack>
      <VStack gap='4'>
        <TextDeprecated
          className={style.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <HStack gap='8'>
          <IconDeprecated className={style.icon} Svg={EyeIcon} />
          <TextDeprecated text={String(article?.views)} />
        </HStack>
        <HStack gap='8'>
          <IconDeprecated className={style.icon} Svg={CalendarIcon} />
          <TextDeprecated text={article?.createdAt} />
        </HStack>
      </VStack>
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
  const { t } = useTranslation('article-details');

  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <>
        <SkeletonDeprecated
          className={style.avatar}
          width={200}
          height={200}
          border='50%'
        />
        <SkeletonDeprecated
          className={style.title}
          width={300}
          height={32}
          border={4}
        />
        <SkeletonDeprecated
          className={style.skeleton}
          width={600}
          height={24}
        />
        <SkeletonDeprecated
          className={style.skeleton}
          width='100%'
          height={200}
        />
        <SkeletonDeprecated
          className={style.skeleton}
          width='100%'
          height={200}
        />
      </>
    );
  } else if (error) {
    content = (
      <TextDeprecated
        align={TextAlign.CENTER}
        title={t('An error occurred while loading the article')}
      />
    );
  } else {
    content = (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<Redesigned />}
        off={<Deprecated />}
      />
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack
        gap='16'
        className={classNames(style.articleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
