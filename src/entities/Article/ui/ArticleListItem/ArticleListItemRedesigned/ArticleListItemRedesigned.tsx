import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { ArtickleTextBlock } from '../../../model/types/article';
import {
  ArticleBlockType,
  ArticleView,
} from '../../../model/consts/articleConsts';
import { ArticleListItemProps } from '../ArticleListItem';

import style from './articleListItemRedesigned.module.scss';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;

  const { t } = useTranslation('article');

  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar} />
      <Text bold text={article.user.username} />
    </>
  );

  const views = (
    <HStack gap='8'>
      <Icon Svg={EyeIcon} />
      <Text className={style.views} text={String(article.views)} />
    </HStack>
  );

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArtickleTextBlock;

    return (
      <Card
        className={classNames('', {}, [className, style[view]])}
        max
        padding='24'
        data-testid='ArticleListItem'
      >
        <VStack max gap='16'>
          <HStack gap='8'>
            {userInfo}
            <Text text={article.createdAt} />
          </HStack>
          <Text bold title={article.title} />
          <Text title={article.subtitle} size='s' />
          <AppImage
            className={style.img}
            fallback={<Skeleton width='100%' height={250} />}
            src={article.img}
            alt={article.title}
          />
          {textBlock?.paragraphs && (
            <Text
              className={style.textBlock}
              text={textBlock.paragraphs.slice(0, 2).join('')}
            />
          )}
          <HStack max justify='between'>
            <AppLink to={getRouteArticleDetails(article.id)} target={target}>
              <Button>{t('Read more')}</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <AppLink
      className={classNames('', {}, [className, style[view]])}
      to={getRouteArticleDetails(article.id)}
      target={target}
      data-testid='ArticleListItem'
    >
      <Card className={style.card} border='round' padding='0'>
        <AppImage
          className={style.img}
          fallback={<Skeleton width='100%' height={200} />}
          src={article.img}
          alt={article.title}
        />
        <VStack className={style.info} gap='4'>
          <Text className={style.title} text={article.title} />
          <VStack className={style.footer} gap='4'>
            <HStack justify='between' max>
              <Text className={style.date} text={article.createdAt} />
              {views}
            </HStack>
            <HStack className={style.userInfo} gap='4'>
              {userInfo}
            </HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
