import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import {
  TextAlign,
  Text as TextDeprecated,
  TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Loader } from '@/shared/ui/deprecated/Loader';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

import style from './profileCardDeprecated.module.scss';

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('profile');
  return (
    <HStack
      justify='center'
      max
      className={classNames(style.profileCard, {}, [style.error])}
    >
      <TextDeprecated
        theme={TextTheme.ERROR}
        title={t('An error occurred while loading the profile')}
        text={t('Try refreshing the page')}
        align={TextAlign.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedLoader = () => {
  return (
    <HStack
      justify='center'
      max
      className={classNames(style.profileCard, {}, [style.loading])}
    >
      <Loader />
    </HStack>
  );
};

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
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
    <VStack
      gap='8'
      max
      className={classNames(style.profileCard, { [style.editing]: !readonly }, [
        className,
      ])}
    >
      {data?.avatar && (
        <HStack justify='center' max>
          <AvatarDeprecated src={data?.avatar} alt='avatar' />
        </HStack>
      )}
      <InputDeprecated
        value={data?.first}
        placeholder={t('Name')}
        readonly={readonly}
        onChange={onChangeFirstname}
        data-testid='ProfileCard.firstname'
      />
      <InputDeprecated
        value={data?.lastname}
        placeholder={t('Surname')}
        readonly={readonly}
        onChange={onChangeLastname}
        data-testid='ProfileCard.lastname'
      />
      <InputDeprecated
        value={data?.age}
        placeholder={t('Age')}
        readonly={readonly}
        onChange={onChangeAge}
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
      />
      <InputDeprecated
        value={data?.city}
        placeholder={t('City')}
        readonly={readonly}
        onChange={onChangeCity}
      />
      <InputDeprecated
        value={data?.username}
        placeholder={t('User name')}
        readonly={readonly}
        onChange={onChangeUsername}
      />
      <InputDeprecated
        value={data?.avatar}
        placeholder={t('Link to the avatar')}
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
  );
});
