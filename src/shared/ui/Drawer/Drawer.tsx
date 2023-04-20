import { ReactNode, memo } from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { useModal } from 'shared/lib/hooks/useModal/useModal';

import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

import style from './drawer.module.scss';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Drawer = memo((props: DrawerProps) => {
  const { className, children, isOpen, onClose, lazy } = props;

  const { isClosing, isMounted, closeHandler } = useModal({
    animationDelay: 300,
    onClose,
    isOpen,
  });

  const { theme } = useTheme();

  const mods: Mods = {
    [style.opened]: isOpen,
    [style.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(style.drawer, mods, [
          className,
          theme,
          'app_drawer',
        ])}
      >
        <Overlay onClick={closeHandler} />
        <div className={style.content}>{children}</div>
      </div>
    </Portal>
  );
});
