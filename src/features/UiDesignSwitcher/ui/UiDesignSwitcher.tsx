import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ListBox } from '@/shared/ui/redesigned/Popups';
import { getFeatureFlags, updateFeatureFlags } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);

  const isAppRedesigned = getFeatureFlags('isAppRedesigned');
  console.log(isAppRedesigned);
  const items = [
    {
      content: t('Old design'),
      value: 'old',
    },
    {
      content: t('New design'),
      value: 'new',
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);
      await dispatch(
        updateFeatureFlags({
          userId: authData.id,
          newFeatures: {
            isAppRedesigned: value === 'new',
          },
        })
      ).unwrap();
      setIsLoading(false);
    }
  };

  return (
    <HStack gap='8'>
      <Text title={t('Interface option')} />
      {isLoading ? (
        <Skeleton width={100} height={40} />
      ) : (
        <ListBox
          className={className}
          value={isAppRedesigned ? 'new' : 'old'}
          items={items}
          onChange={onChange}
        />
      )}
    </HStack>
  );
});
