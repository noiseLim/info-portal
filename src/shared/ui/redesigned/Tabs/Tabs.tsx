import { ReactNode, memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

import style from './tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, value, onTabClick, direction = 'row' } = props;

  const clickHandle = useCallback(
    (tab: TabItem) => {
      return () => {
        onTabClick(tab);
      };
    },
    [onTabClick]
  );

  return (
    <Flex
      className={classNames(style.tabs, {}, [className])}
      direction={direction}
      gap='8'
      align='start'
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;
        return (
          <Card
            className={classNames(
              style.tab,
              { [style.selected]: isSelected },
              []
            )}
            key={tab.value}
            variant={isSelected ? 'light' : 'normal'}
            onClick={clickHandle(tab)}
            border='round'
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});
