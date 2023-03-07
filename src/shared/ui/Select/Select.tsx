import { ChangeEvent, memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import style from './select.module.scss';

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}
export const Select = memo((props: SelectProps) => {
  const { className, label, options, value, onChange, readonly } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  const optionList = useMemo(() => {
    return options?.map((item) => (
      <option className={style.option} value={item.value} key={item.value}>
        {item.content}
      </option>
    ));
  }, [options]);

  return (
    <div
      className={classNames(style.wrapper, { [style.readonly]: readonly }, [
        className,
      ])}
    >
      {label && <span className={style.label}>{`${label}>`}</span>}
      <select
        className={style.select}
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionList}
      </select>
    </div>
  );
});
