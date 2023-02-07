import { useState } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';

import style from './sidebar.module.scss';

interface SidebarProps {
  className?: string;
}
export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onTogle = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <div
      className={classNames(style.sidebar, { [style.collapsed]: collapsed }, [
        className,
      ])}
    >
      <button onClick={onTogle}>toggle</button>
      <div className={style.switchers}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Sidebar;
