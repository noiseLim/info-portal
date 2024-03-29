import { memo, Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

import style from './loginModal.module.scss';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}
export const LoginModal = memo(
  ({ className, isOpen, onClose }: LoginModalProps) => {
    return (
      <Modal
        className={classNames(style.loginModal, {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
      >
        <Suspense fallback={<Loader />}>
          <LoginFormAsync onSuccess={onClose} />
        </Suspense>
      </Modal>
    );
  }
);
