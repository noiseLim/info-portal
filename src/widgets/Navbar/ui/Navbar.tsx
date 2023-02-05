import { Link } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import style from './navbar.module.scss';

interface NavbarProps {
  className?: string;
}
export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(style.navbar, {}, [className])}>
      <div className={style.links}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={'/'}
          className={style.mainLink}
        >
          Главная
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to={'/about'}>
          О сайте
        </AppLink>
      </div>
    </div>
  );
};

export default Navbar;
