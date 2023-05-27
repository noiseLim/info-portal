import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/render/forceUpdate';

import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';

import style from './loginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);
  const forceUpdate = useForceUpdate();

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
      forceUpdate();
    }
  }, [dispatch, username, password, onSuccess, forceUpdate]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <VStack
            className={classNames(style.loginForm, {}, [className])}
            gap='16'
          >
            <Text title={t('Authorization form')} />
            {error && (
              <Text
                text={t('You entered an incorrect password')}
                variant='error'
              />
            )}
            <Input
              className={style.input}
              placeholder={t('Enter username')}
              onChange={onChangeUsername}
              value={username}
              autofocus
            />
            <Input
              className={style.input}
              placeholder={t('Enter password')}
              onChange={onChangePassword}
              value={password}
            />
            <Button
              className={style.loginBtn}
              onClick={onLoginClick}
              variant='outline'
              disabled={isLoading}
            >
              {t('Login')}
            </Button>
          </VStack>
        }
        off={
          <div className={classNames(style.loginForm, {}, [className])}>
            <TextDeprecated title={t('Authorization form')} />
            {error && (
              <TextDeprecated
                text={t('You entered an incorrect password')}
                theme={TextTheme.ERROR}
              />
            )}
            <InputDeprecated
              className={style.input}
              placeholder={t('Enter username')}
              onChange={onChangeUsername}
              value={username}
              autofocus
            />
            <InputDeprecated
              className={style.input}
              placeholder={t('Enter password')}
              onChange={onChangePassword}
              value={password}
            />
            <ButtonDeprecated
              className={style.loginBtn}
              onClick={onLoginClick}
              theme={ButtonTheme.OUTLINE}
              disabled={isLoading}
            >
              {t('Login')}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  );
});

export default LoginForm;
