import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile');
  return (
    <HStack justify='center' max>
      <Text
        variant='error'
        title={t('An error occurred while loading the profile')}
        text={t('Try refreshing the page')}
        align='center'
      />
    </HStack>
  );
};

export const ProfileCardRedesignedSkeleton = () => {
  return (
    <Card padding='24' max>
      <VStack gap='32'>
        <HStack justify='center' max>
          <Skeleton border='100%' width={128} height={128} />
        </HStack>
        <HStack gap='32' max>
          <VStack gap='16' max>
            <Skeleton width='100%' height='38' />
            <Skeleton width='100%' height='38' />
            <Skeleton width='100%' height='38' />
            <Skeleton width='100%' height='38' />
          </VStack>
          <VStack gap='16' max>
            <Skeleton width='100%' height='38' />
            <Skeleton width='100%' height='38' />
            <Skeleton width='100%' height='38' />
            <Skeleton width='100%' height='38' />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
  const { t } = useTranslation('profile');

  const {
    className,
    data,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  } = props;

  return (
    <Card className={classNames('', {}, [className])} max padding='24'>
      <VStack gap='32'>
        {data?.avatar && (
          <HStack justify='center' max>
            <Avatar src={data?.avatar} alt='avatar' size={128} />
          </HStack>
        )}
        <HStack gap='24' max>
          <VStack gap='16' max>
            <Input
              value={data?.first}
              label={t('Name')}
              readonly={readonly}
              onChange={onChangeFirstname}
              data-testid='ProfileCard.firstname'
            />
            <Input
              value={data?.lastname}
              label={t('Surname')}
              readonly={readonly}
              onChange={onChangeLastname}
              data-testid='ProfileCard.lastname'
            />
            <Input
              value={data?.age}
              label={t('Age')}
              readonly={readonly}
              onChange={onChangeAge}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <Input
              value={data?.city}
              label={t('City')}
              readonly={readonly}
              onChange={onChangeCity}
            />
          </VStack>
          <VStack gap='16' max>
            <Input
              value={data?.username}
              label={t('User name')}
              readonly={readonly}
              onChange={onChangeUsername}
            />
            <Input
              value={data?.avatar}
              label={t('Link to the avatar')}
              readonly={readonly}
              onChange={onChangeAvatar}
            />
            <CurrencySelect
              value={data?.currency}
              onChange={onChangeCurrency}
              readonly={readonly}
            />
            <CountrySelect
              value={data?.country}
              onChange={onChangeCountry}
              readonly={readonly}
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
});
