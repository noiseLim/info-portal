import { memo } from 'react';

import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';

import { Comment } from '../../model/types/comment';

import style from './commentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  if (isLoading) {
    return (
      <VStack
        gap='8'
        max
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
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card padding='24' border='partial' max>
          <VStack
            gap='8'
            max
            className={classNames('', {}, [className])}
            data-testid='CommentCard.Content'
          >
            <AppLink to={getRouteProfile(comment.user.id)}>
              <HStack gap='8'>
                <Avatar size={30} src={comment.user.avatar} />
                <Text text={comment.user.username} bold />
              </HStack>
            </AppLink>
            <Text text={comment.text} />
          </VStack>
        </Card>
      }
      off={
        <VStack
          gap='8'
          max
          className={classNames(style.commentCard, {}, [className])}
          data-testid='CommentCard.Content'
        >
          <AppLinkDeprecated
            to={getRouteProfile(comment.user.id)}
            className={style.header}
          >
            <AvatarDeprecated size={30} src={comment.user.avatar} />
            <TextDeprecated
              className={style.username}
              title={comment.user.username}
            />
          </AppLinkDeprecated>
          <TextDeprecated className={style.text} text={comment.text} />
        </VStack>
      }
    />
  );
});
