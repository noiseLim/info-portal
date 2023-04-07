import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'shared/ui/Page/Page';

const MainPage = memo((props) => {
  const { t } = useTranslation('main');
  return <Page>{t('Main Page')}</Page>;
});

export default MainPage;
