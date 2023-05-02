import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

const MainPage = memo((props) => {
  const { t } = useTranslation('main');
  return <Page data-testid='MainPage'>{t('Main Page')}</Page>;
});

export default MainPage;
