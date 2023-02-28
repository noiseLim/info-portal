import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = memo((props) => {
  const { t } = useTranslation('about');
  return <div>{t('About us')}</div>;
});

export default AboutPage;
