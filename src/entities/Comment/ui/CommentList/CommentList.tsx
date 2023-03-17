import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';

import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../model/types/comment';

import style from './commentList.module.scss';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;

  const { t } = useTranslation();

  return (
    <div className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            isLoading={isLoading}
            className={style.comment}
            comment={comment}
          />
        ))
      ) : (
        <Text text={t('There are no comments')} />
      )}
    </div>
  );
});
