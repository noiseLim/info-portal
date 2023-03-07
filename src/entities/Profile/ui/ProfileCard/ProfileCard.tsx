import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';
import { Profile } from '../../model/types/profile';

import style from './profileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country?: Country) => void;
}
export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    error,
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
  const { t } = useTranslation('profile');

  if (isLoading) {
    return (
      <div
        className={classNames(style.profileCard, {}, [
          className,
          style.loading,
        ])}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={classNames(style.profileCard, {}, [className, style.error])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t('An error occurred while loading the profile')}
          text={t('Try refreshing the page')}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  return (
    <div
      className={classNames(style.profileCard, { [style.editing]: !readonly }, [
        className,
      ])}
    >
      <div className={style.data}>
        {data?.avatar && (
          <div className={style.avatarWrapper}>
            <Avatar src={data?.avatar} alt='avatar' />
          </div>
        )}
        <Input
          className={style.input}
          value={data?.first}
          placeholder={t('Your name')}
          readonly={readonly}
          onChange={onChangeFirstname}
        />
        <Input
          className={style.input}
          value={data?.lastname}
          placeholder={t('Your surname')}
          readonly={readonly}
          onChange={onChangeLastname}
        />
        <Input
          className={style.input}
          value={data?.age}
          placeholder={t('Your age')}
          readonly={readonly}
          onChange={onChangeAge}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
        <Input
          className={style.input}
          value={data?.city}
          placeholder={t('City')}
          readonly={readonly}
          onChange={onChangeCity}
        />
        <Input
          className={style.input}
          value={data?.username}
          placeholder={t('Enter the user name')}
          readonly={readonly}
          onChange={onChangeUsername}
        />
        <Input
          className={style.input}
          value={data?.avatar}
          placeholder={t('Enter the link to the avatar')}
          readonly={readonly}
          onChange={onChangeAvatar}
        />
        <CurrencySelect
          className={style.input}
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
        <CountrySelect
          className={style.input}
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </div>
    </div>
  );
};
