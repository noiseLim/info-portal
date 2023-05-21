import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  AppLink as AppLinkDeprecated,
  AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

import { SidebarItemType } from '../../model/types/sidebar';

import style from './sidebarItem.module.scss';
import styleRedesigned from './sidebarItemRedesigned.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}
export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();

  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <AppLink
          to={item.path}
          className={classNames(
            styleRedesigned.item,
            { [styleRedesigned.collapsed]: collapsed },
            []
          )}
          activeClassName={styleRedesigned.active}
        >
          <Icon Svg={item.Icon} />
          <span className={styleRedesigned.link}>{t(item.text)}</span>
        </AppLink>
      }
      off={
        <AppLinkDeprecated
          theme={AppLinkTheme.SECONDARY}
          to={item.path}
          className={classNames(
            style.item,
            { [style.collapsed]: collapsed },
            []
          )}
        >
          <item.Icon className={style.icon} />
          <span className={style.link}>{t(item.text)}</span>
        </AppLinkDeprecated>
      }
    />
  );
});
