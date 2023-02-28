import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = memo((props) => {
  const { t } = useTranslation('main');
  return <div>{t('Main Page')}</div>;
});

export default MainPage;
