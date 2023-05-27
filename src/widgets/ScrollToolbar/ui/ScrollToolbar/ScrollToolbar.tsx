import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ScrollToTopButton } from '@/features/scrollToTopButton';

import style from './scrollToolbar.module.scss';

interface ScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props;

  return (
    <VStack
      className={classNames(style.scrollToolbar, {}, [className])}
      justify='center'
      align='center'
      max
    >
      <ScrollToTopButton />
    </VStack>
  );
});
