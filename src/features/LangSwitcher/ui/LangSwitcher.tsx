import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
  Button as ButtonDepreacated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}
export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggler = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Button variant='clear' onClick={toggler}>
          {t(short ? 'Short language' : 'Language')}
        </Button>
      }
      off={
        <ButtonDepreacated
          className={classNames('', {}, [className])}
          theme={ButtonTheme.CLEAR}
          onClick={toggler}
        >
          {t(short ? 'Short language' : 'Language')}
        </ButtonDepreacated>
      }
    />
  );
});
