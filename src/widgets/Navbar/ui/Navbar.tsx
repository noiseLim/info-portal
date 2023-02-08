import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import style from './navbar.module.scss';

interface NavbarProps {
  className?: string;
}
export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(style.navbar, {}, [className])}>
      <div className={style.links}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={'/'}
          className={style.mainLink}
        >
          {t('Главная страница')}
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to={'/about'}>
          {t('О сайте')}
        </AppLink>
      </div>
    </div>
  );
};

export default Navbar;
