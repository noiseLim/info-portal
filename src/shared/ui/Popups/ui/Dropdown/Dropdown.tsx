import { Fragment, ReactNode } from 'react';
import { Menu } from '@headlessui/react';

import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';

import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';

import style from './dropdown.module.scss';
import popupStyle from '../../styles/popup.module.scss';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger?: ReactNode;
  direction?: DropdownDirection;
}

export function Dropdown(props: DropdownProps) {
  const { className, items, trigger, direction = 'bottom right' } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu
      as='div'
      className={classNames(style.dropdown, {}, [className, popupStyle.popup])}
    >
      <Menu.Button as='div' className={popupStyle.trigger}>
        {trigger}
      </Menu.Button>
      <Menu.Items className={classNames(style.menu, {}, menuClasses)}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type='button'
              className={classNames(
                style.item,
                { [popupStyle.active]: active },
                [className]
              )}
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
