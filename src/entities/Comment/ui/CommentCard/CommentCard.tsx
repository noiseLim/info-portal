import { memo } from 'react';

import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { Comment } from '../../model/types/comment';

import style from './commentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <VStack
        gap='8'
        className={classNames(style.commentCard, {}, [
          className,
          style.loading,
        ])}
        data-testid='CommentCard.Loading'
      >
        <div className={style.header}>
          <Skeleton width={30} height={30} border='50%' />
          <Skeleton width={100} height={16} className={style.username} />
        </div>
        <Skeleton className={style.text} width='100%' height={50} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <VStack
      gap='8'
      max
      className={classNames(style.commentCard, {}, [className])}
      data-testid='CommentCard.Content'
    >
      <AppLink to={getRouteProfile(comment.user.id)} className={style.header}>
        <Avatar size={30} src={comment.user.avatar} />
        <Text className={style.username} title={comment.user.username} />
      </AppLink>
      <Text className={style.text} text={comment.text} />
    </VStack>
  );
});
