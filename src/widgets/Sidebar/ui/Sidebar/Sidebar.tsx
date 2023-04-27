import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { VStack } from '@/shared/ui/Stack';

import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';

import style from './sidebar.module.scss';

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
    <aside
      data-testid='sidebar'
      className={classNames(style.sidebar, { [style.collapsed]: collapsed }, [
        className,
      ])}
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
  );
});
