import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal/Modal';

import style from './navbar.module.scss';

interface NavbarProps {
  className?: string;
}
export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(style.navbar, {}, [className])}>
      <Button
        className={style.links}
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={onToggleModal}
      >
        {t('Login')}
      </Button>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <Modal isOpen={isAuthModal} onClose={onToggleModal}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cum
        molestiae impedit voluptas harum neque omnis ducimus rem voluptatum
        incidunt, quaerat quae asperiores iste eos ea perferendis expedita
        soluta quos!
      </Modal>
    </div>
  );
};
