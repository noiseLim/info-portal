import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ToggleFeatures } from '@/shared/lib/features';

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

export const CountrySelect = memo(
  ({ className, value, onChange, readonly }: CountrySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange]
    );

    const props = {
      className,
      value,
      items: options,
      defaultValue: t('Select a country'),
      label: t('Select a country'),
      onChange: onChangeHandler,
      readonly,
    };

    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<ListBox {...props} />}
        off={<ListBoxDeprecated {...props} />}
      />
    );
  }
);
