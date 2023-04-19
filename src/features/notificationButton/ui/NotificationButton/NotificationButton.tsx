import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/Popups';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';
import { NotificationList } from 'entities/Notification';

import style from './notificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  return (
    <Popover
      className={classNames(style.notificationButton, {}, [className])}
      direction='bottom left'
      trigger={
        <Button theme={ButtonTheme.CLEAR}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      }
    >
      <NotificationList className={style.notifications} />
    </Popover>
  );
});
