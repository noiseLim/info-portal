import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { loginActions } from '../../model/slice/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../services/loginByUsername/loginByUsername';

import style from './loginForm.module.scss';

interface LoginFormProps {
  className?: string;
}
export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { username, password, error, isLoading } = useSelector(getLoginState);

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

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  return (
    <div className={classNames(style.loginForm, {}, [className])}>
      <Text title={t('Authorization form')} />
      {error && (
        <Text
          text={t('You entered an incorrect password')}
          theme={TextTheme.ERROR}
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
        theme={ButtonTheme.OUTLINE}
        disabled={isLoading}
      >
        {t('Login')}
      </Button>
    </div>
  );
});
