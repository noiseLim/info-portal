import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const { t } = useTranslation('article');

  return (
    <div className={classNames('', {}, [className])}>{t('Articles page')}</div>
  );
};

export default memo(ArticlesPage);
