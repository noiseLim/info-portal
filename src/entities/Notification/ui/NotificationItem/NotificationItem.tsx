import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { Text } from 'shared/ui/Text/Text';

import { Notification } from '../../model/types/notification';

import style from './notificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, item } = props;

  const { t } = useTranslation();

  const content = (
    <Card
      theme={CardTheme.OUTLINED}
      className={classNames(style.notificationItem, {}, [className])}
    >
      <Text title={item.title} text={item.description} />
    </Card>
  );

  if (item?.href) {
    return (
      <a
        className={style.link}
        href={item.href}
        target='_blank'
        rel='noreferrer'
      >
        {content}
      </a>
    );
  }

  return content;
});