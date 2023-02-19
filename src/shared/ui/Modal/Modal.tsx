import {
  ReactNode,
  MouseEvent,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';

import style from './modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const ANIMATION_TIME = 300;

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose } = props;
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const { theme } = useTheme();

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_TIME);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const onContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const mods = {
    [style.opened]: isOpen,
    [style.isClosing]: isClosing,
    [style[theme]]: true,
  };

  return (
    <Portal>
      <div className={classNames(style.modal, mods, [className])}>
        <div className={style.overlay} onClick={closeHandler}>
          <div className={style.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
