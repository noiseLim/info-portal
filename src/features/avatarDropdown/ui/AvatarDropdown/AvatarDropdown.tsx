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
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import {
  getRouteAdminPanel,
  getRouteProfile,
  getRouteSettings,
} from '@/shared/const/router';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { ToggleFeatures } from '@/shared/lib/features';

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

  const items = [
    ...(isAdminPanelAailable
      ? [{ content: t('Admin'), href: getRouteAdminPanel() }]
      : []),
    { content: t('Settings'), href: getRouteSettings() },
    { content: t('Profile'), href: getRouteProfile(authData.id) },
    { content: t('Logout'), onClick: onLogout },
  ];

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Dropdown
          className={classNames('', {}, [className])}
          items={items}
          trigger={<Avatar size={40} src={authData.avatar} />}
          direction='bottom left'
        />
      }
      off={
        <DropdownDeprecated
          className={classNames('', {}, [className])}
          items={items}
          trigger={
            <AvatarDeprecated
              size={30}
              src={authData.avatar}
              fallbackInverted
            />
          }
          direction='bottom left'
        />
      }
    />
  );
});
