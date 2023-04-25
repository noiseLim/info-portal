import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

import style from './notFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string;
}
export const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const { t } = useTranslation();

  return (
    <Page className={classNames(style.notFoundPage, {}, [className])}>
      {t('Page not Found')}
    </Page>
  );
};
