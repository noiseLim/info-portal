import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';

import style from './articleAdditionalInfo.module.scss';

interface ArticleAdditionalInfoProps {
  className?: string;
  author: User;
  createdAd: string;
  views: number;
  onEdit: () => void;
}

export const ArticleAdditionalInfo = memo(
  (props: ArticleAdditionalInfoProps) => {
    const { className, author, createdAd, views, onEdit } = props;

    const { t } = useTranslation('article-details');

    return (
      <VStack
        gap='32'
        className={classNames(style.articleAdditionalInfo, {}, [className])}
      >
        <HStack gap='8'>
          <Avatar src={author.avatar} size={32} />
          <Text text={author.username} bold />
          <Text text={createdAd} />
        </HStack>
        <Button onClick={onEdit}>{t('Edit')}</Button>
        <Text text={t('{{count}} views', { count: views })} />
      </VStack>
    );
  }
);
