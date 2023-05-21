import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';

import style from './sidebar.module.scss';
import styleRedesigned from './sidebarRedesigned.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItemsList = useSelector(getSidebarItems);

  const onTogle = () => {
    setCollapsed((prevState) => !prevState);
  };

  const itemList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem key={item.path} item={item} collapsed={collapsed} />
      )),
    [collapsed, sidebarItemsList]
  );

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <aside
          data-testid='sidebar'
          className={classNames(
            styleRedesigned.sidebar,
            { [styleRedesigned.collapsed]: collapsed },
            [className]
          )}
        >
          <AppLogo
            className={styleRedesigned.appLogo}
            size={collapsed ? 30 : 50}
          />
          <VStack role='navigation' gap='8' className={styleRedesigned.items}>
            {itemList}
          </VStack>
          <Icon
            data-testid='sidebar-toggle'
            onClick={onTogle}
            className={styleRedesigned.collapseBtn}
            Svg={ArrowIcon}
            clickable
          />
          <div className={styleRedesigned.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={styleRedesigned.lang} short={collapsed} />
          </div>
        </aside>
      }
      off={
        <aside
          data-testid='sidebar'
          className={classNames(
            style.sidebar,
            { [style.collapsed]: collapsed },
            [className]
          )}
        >
          <Button
            data-testid='sidebar-toggle'
            onClick={onTogle}
            className={style.collapseBtn}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            square
            size={ButtonSize.L}
          >
            {collapsed ? '>' : '<'}
          </Button>
          <VStack role='navigation' gap='8' className={style.items}>
            {itemList}
          </VStack>
          <div className={style.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={style.lang} short={collapsed} />
          </div>
        </aside>
      }
    />
  );
});
