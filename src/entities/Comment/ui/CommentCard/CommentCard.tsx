import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';

import { Comment } from '../../model/types/comment';

import style from './commentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <div className={classNames(style.commentCard, {}, [className])}>
        <div className={style.header}>
          <Skeleton width={30} height={30} border='50%' />
          <Skeleton width={100} height={16} className={style.username} />
        </div>
        <Skeleton className={style.text} width='100%' height={50} />
      </div>
    );
  }

  return (
    <div className={classNames(style.commentCard, {}, [className])}>
      <div className={style.header}>
        <Avatar size={30} src={comment.user.avatar} />
        <Text className={style.username} title={comment.user.username} />
      </div>
      <Text className={style.text} text={comment.text} />
    </div>
  );
});
