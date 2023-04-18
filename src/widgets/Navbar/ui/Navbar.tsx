import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import {
  getUserAuthData,
  getUserIsAdmin,
  getUserIsManager,
  userActions,
} from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';

import style from './navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isAuthModal, setIsAuthModal] = useState(false);

  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(getUserIsAdmin);
  const isManager = useSelector(getUserIsManager);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAailable = isAdmin || isManager;

  if (authData) {
    return (
      <header className={classNames(style.navbar, {}, [className])}>
        <Text
          className={style.appName}
          title={t('My App')}
          theme={TextTheme.INVERTED}
        />
        <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY}>
          {t('Create an article')}
        </AppLink>
        <Dropdown
          className={style.dropdown}
          items={[
            ...(isAdminPanelAailable
              ? [{ content: t('Admin'), href: RoutePath.admin_panel }]
              : []),
            { content: t('Profile'), href: RoutePath.profile + authData.id },
            { content: t('Logout'), onClick: onLogout },
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
          direction='bottom left'
        />
      </header>
    );
  }

  return (
    <header className={classNames(style.navbar, {}, [className])}>
      <Button
        className={style.links}
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={onShowModal}
      >
        {t('Login')}
      </Button>
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
