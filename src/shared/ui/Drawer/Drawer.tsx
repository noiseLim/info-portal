import { ReactNode, memo } from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';

import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

import style from './drawer.module.scss';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
  const { className, children, isOpen, onClose } = props;

  const { theme } = useTheme();

  const mods: Mods = {
    [style.opened]: isOpen,
  };

  return (
    <Portal>
      <div
        className={classNames(style.drawer, mods, [
          className,
          theme,
          'app_drawer',
        ])}
      >
        <Overlay onClick={onClose} />
        <div className={style.content}>{children}</div>
      </div>
    </Portal>
  );
});
