import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'widgets/Page/Page';

const AdminPanelPage = memo((props) => {
  const { t } = useTranslation();
  return <Page>{t('AdminPanelPage')}</Page>;
});

export default AdminPanelPage;
