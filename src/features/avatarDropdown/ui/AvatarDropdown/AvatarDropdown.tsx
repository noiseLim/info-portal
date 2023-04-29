import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getUserAuthData,
  getUserIsAdmin,
  getUserIsManager,
  userActions,
} from '@/entities/User';
import { Dropdown } from '@/shared/ui/Popups';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { Avatar } from '@/shared/ui/Avatar';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isAdmin = useSelector(getUserIsAdmin);
  const isManager = useSelector(getUserIsManager);
  const authData = useSelector(getUserAuthData);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAailable = isAdmin || isManager;

  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      className={classNames('', {}, [className])}
      items={[
        ...(isAdminPanelAailable
          ? [{ content: t('Admin'), href: getRouteAdminPanel() }]
          : []),
        { content: t('Profile'), href: getRouteProfile(authData.id) },
        { content: t('Logout'), onClick: onLogout },
      ]}
      trigger={<Avatar size={30} src={authData.avatar} />}
      direction='bottom left'
    />
  );
});
