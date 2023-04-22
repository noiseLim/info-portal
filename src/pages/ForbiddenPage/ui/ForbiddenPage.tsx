import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page/Page';

export const ForbiddenPage = memo((props) => {
  const { t } = useTranslation();
  return <Page>{t('You do not have access')}</Page>;
});
