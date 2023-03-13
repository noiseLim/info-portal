import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

interface ArticleDetailsPageProps {
  className?: string;
}
const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article');

  return (
    <div className={classNames('', {}, [className])}>
      {t('Article details page')}
    </div>
  );
};

export default memo(ArticleDetailsPage);
