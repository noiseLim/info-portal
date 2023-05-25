import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { UiDesignSwitcher } from '@/features/UiDesignSwitcher';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface SettingsPageProps {
  className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
  const { className } = props;

  const { t } = useTranslation();
  return (
    <Page className={classNames('', {}, [className])}>
      <VStack gap='16'>
        {t('SettingsPage')}
        <UiDesignSwitcher />
      </VStack>
    </Page>
  );
});

export default SettingsPage;
