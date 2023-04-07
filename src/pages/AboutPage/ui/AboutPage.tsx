import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'shared/ui/Page/Page';

const AboutPage = memo((props) => {
  const { t } = useTranslation('about');
  return <Page>{t('About us')}</Page>;
});

export default AboutPage;
