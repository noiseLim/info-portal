import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';

import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../model/types/comment';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack gap='16' max className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap='16' max className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            isLoading={isLoading}
            comment={comment}
          />
        ))
      ) : (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<Text text={t('There are no comments')} />}
          off={<TextDeprecated text={t('There are no comments')} />}
        />
      )}
    </VStack>
  );
});
