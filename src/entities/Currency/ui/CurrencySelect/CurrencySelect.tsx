import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ToggleFeatures } from '@/shared/lib/features';

import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(
  ({ className, value, onChange, readonly }: CurrencySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange]
    );

    const props = {
      className,
      value,
      items: options,
      defaultValue: t('Select the currency'),
      label: t('Select the currency'),
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
