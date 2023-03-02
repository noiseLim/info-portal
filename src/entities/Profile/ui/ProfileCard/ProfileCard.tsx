import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/model/services/fetchProfileError/fetchProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/services/fetchProfileIsLoading/fetchProfileIsLoading';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';

import style from './profileCard.module.scss';

interface ProfileCardProps {
  className?: string;
}
export const ProfileCard = ({ className }: ProfileCardProps) => {
  const { t } = useTranslation('profile');

  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  return (
    <div className={classNames(style.profileCard, {}, [className])}>
      <div className={style.header}>
        <Text text={t('Profile')} />
        <Button className={style.editBtn} theme={ButtonTheme.OUTLINE}>
          {t('Edit')}
        </Button>
      </div>
      <div className={style.data}>
        <Input
          className={style.input}
          value={data?.first}
          placeholder={t('Your name')}
        />
        <Input
          className={style.input}
          value={data?.lastname}
          placeholder={t('Your surname')}
        />
      </div>
    </div>
  );
};
