import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

const AdminPanelPage = memo((props) => {
  const { t } = useTranslation();
  return <Page data-testid='AdminPanelPage'>{t('Admin panel page')}</Page>;
});

export default AdminPanelPage;
