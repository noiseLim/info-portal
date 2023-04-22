import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';
import style from './pageError.module.scss';

interface PageErrorProps {
  className?: string;
}
export const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(style.pageError, {}, [className])}>
      <p>{t('An unexpected error has occurred')}</p>
      <Button onClick={reloadPage}>{t('Reload page')}</Button>
    </div>
  );
};
