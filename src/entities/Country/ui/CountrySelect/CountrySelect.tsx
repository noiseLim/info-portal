import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { ListBox } from 'shared/ui/Popups/ui/ListBox/ListBox';

import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Ukraine, content: Country.Ukraine },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Armenia, content: Country.Armenia },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, value, onChange, readonly } = props;
  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange]
  );

  return (
    <ListBox
      className={classNames('', {}, [className])}
      value={value}
      items={options}
      defaultValue={t('Select a country')}
      label={t('Select a country')}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
