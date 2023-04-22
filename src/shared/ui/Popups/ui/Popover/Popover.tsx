import { ReactNode } from 'react';
import { Popover as HPopover } from '@headlessui/react';

import { DropdownDirection } from '@/shared/types/ui';
import { classNames } from '@/shared/lib/classNames/classNames';

import { mapDirectionClass } from '../../styles/consts';

import style from './popover.module.scss';
import popupStyle from '../../styles/popup.module.scss';

interface PopoverProps {
  className?: string;
  trigger?: ReactNode;
  direction?: DropdownDirection;
  children: ReactNode;
}

export function Popover(props: PopoverProps) {
  const { className, trigger, direction = 'bottom right', children } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HPopover className={classNames('', {}, [className, popupStyle.popup])}>
      <HPopover.Button as='div' className={popupStyle.trigger}>
        {trigger}
      </HPopover.Button>
      <HPopover.Panel className={classNames(style.panel, {}, menuClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
}
