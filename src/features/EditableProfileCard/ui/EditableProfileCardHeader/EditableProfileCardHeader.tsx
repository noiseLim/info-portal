import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo(
  (props: EditableProfileCardHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const readonly = useSelector(getProfileReadonly);

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
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <Card padding='24' border='partial' max>
            <HStack
              justify='between'
              max
              className={classNames('', {}, [className])}
            >
              <Text title={t('Profile')} />
              {canEdit && (
                <div>
                  {readonly ? (
                    <Button
                      onClick={onEdit}
                      data-testid='EditableProfileCardHeader.EditButton'
                    >
                      {t('Edit')}
                    </Button>
                  ) : (
                    <HStack gap='8'>
                      <Button
                        onClick={onCancelEdit}
                        data-testid='EditableProfileCardHeader.CancelButton'
                        color='error'
                      >
                        {t('Cancel')}
                      </Button>
                      <Button
                        onClick={onSave}
                        data-testid='EditableProfileCardHeader.SaveButton'
                        color='success'
                      >
                        {t('Save')}
                      </Button>
                    </HStack>
                  )}
                </div>
              )}
            </HStack>
          </Card>
        }
        off={
          <HStack
            justify='between'
            max
            className={classNames('', {}, [className])}
          >
            <TextDeprecated text={t('Profile')} />
            {canEdit && (
              <div>
                {readonly ? (
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEdit}
                    data-testid='EditableProfileCardHeader.EditButton'
                  >
                    {t('Edit')}
                  </ButtonDeprecated>
                ) : (
                  <HStack gap='8'>
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE_RED}
                      onClick={onCancelEdit}
                      data-testid='EditableProfileCardHeader.CancelButton'
                    >
                      {t('Cancel')}
                    </ButtonDeprecated>
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE}
                      onClick={onSave}
                      data-testid='EditableProfileCardHeader.SaveButton'
                    >
                      {t('Save')}
                    </ButtonDeprecated>
                  </HStack>
                )}
              </div>
            )}
          </HStack>
        }
      />
    );
  }
);
