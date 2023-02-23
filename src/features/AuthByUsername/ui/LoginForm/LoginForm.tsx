import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

import style from './loginForm.module.scss';

interface LoginFormProps {
  className?: string;
}
export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(style.loginForm, {}, [className])}>
      <Input
        className={style.input}
        placeholder={t('Enter username')}
        autofocus
      />
      <Input className={style.input} placeholder={t('Enter password')} />
      <Button className={style.loginBtn}>{t('Login')}</Button>
    </div>
  );
};
