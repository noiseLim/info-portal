import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';

import { getScrollRestorationByScroll } from '../getScrollRestorationByScroll/getScrollRestorationByScroll';

export const getScrollRestorationByPath = createSelector(
  getScrollRestorationByScroll,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0
);
