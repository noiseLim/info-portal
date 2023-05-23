import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import style from './input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    addonLeft,
    addonRight,
    ...otherProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  const handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const mods: Mods = {
    [style.readonly]: readonly,
    [style.focused]: isFocused,
    [style.withAddonLeft]: Boolean(addonLeft),
    [style.withAddonRight]: Boolean(addonRight),
  };

  return (
    <div className={classNames(style.inputWrapper, mods, [className])}>
      <div className={style.addonLeft}>{addonLeft}</div>
      <input
        {...otherProps}
        type={type}
        value={value}
        onChange={handlerOnChange}
        className={style.input}
        onBlur={onBlur}
        onFocus={onFocus}
        readOnly={readonly}
        placeholder={placeholder}
        ref={ref}
      />
      <div className={style.addonRight}>{addonRight}</div>
    </div>
  );
});
