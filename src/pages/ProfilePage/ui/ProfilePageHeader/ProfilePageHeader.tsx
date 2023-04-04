import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import {
  getProfileData,
  getProfileReadonly,
  profileActions,
  updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';

import style from './profilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
}
export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation('profile');

  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <div className={classNames(style.profilePageHeader, {}, [className])}>
      <Text text={t('Profile')} />
      {canEdit && (
        <div className={style.btnsWrapper}>
          {readonly ? (
            <Button
              className={style.editBtn}
              theme={ButtonTheme.OUTLINE}
              onClick={onEdit}
            >
              {t('Edit')}
            </Button>
          ) : (
            <>
              <Button
                className={style.editBtn}
                theme={ButtonTheme.OUTLINE_RED}
                onClick={onCancelEdit}
              >
                {t('Cancel')}
              </Button>
              <Button
                className={style.saveBtn}
                theme={ButtonTheme.OUTLINE}
                onClick={onSave}
              >
                {t('Save')}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
