import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';

import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';

import { Button } from '../Button/Button';
import { HStack } from '../Stack';

import style from './listBox.module.scss';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  className?: string;
  items?: ListBoxItem[];
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'top left': style.optionsTopLeft,
  'top right': style.optionsTopRight,
  'bottom left': style.optionsBottonLeft,
  'bottom right': style.optionsBottomRight,
};

export function ListBox(props: ListBoxProps) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom right',
    label,
  } = props;

  const optionClasses = [mapDirectionClass[direction]];

  return (
    <HStack
      gap='4'
      className={classNames('', { [style.readonly]: readonly }, [className])}
    >
      {label && <span>{`${label}>`}</span>}
      <HListBox
        className={classNames(style.listBox, {}, [className])}
        as='div'
        value={value}
        onChange={onChange}
        disabled={readonly}
      >
        <HListBox.Button className={style.trigger} as='div'>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(style.options, {}, optionClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(style.item, {
                    [style.active]: active,
                    [style.disabled]: item.disabled,
                  })}
                >
                  {selected && '!!!'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
}
