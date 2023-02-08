import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import Button, { ThemeButton } from 'shared/ui/Button/Button';

import style from './langSwitcher.module.scss';

interface LangSwitcherProps {
  className?: string;
}
export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggler = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      className={classNames(style.langSwitcher, {}, [className])}
      theme={ThemeButton.CLEAR}
      onClick={toggler}
    >
      {t('Language')}
    </Button>
  );
};

export default LangSwitcher;
