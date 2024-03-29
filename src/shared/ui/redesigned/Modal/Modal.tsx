import { ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { toggleFeatures } from '@/shared/lib/features';

import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

import style from './modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_TIME = 300;

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, lazy } = props;

  const { isClosing, isMounted, closeHandler } = useModal({
    animationDelay: ANIMATION_TIME,
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
    <Portal element={document.getElementById('app') ?? document.body}>
      <div
        className={classNames(style.modal, mods, [
          className,
          theme,
          'app_modal',
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => style.modalNew,
            off: () => style.modalOld,
          }),
        ])}
      >
        <Overlay onClick={closeHandler} />
        <div className={style.content}>{children}</div>
      </div>
    </Portal>
  );
};
