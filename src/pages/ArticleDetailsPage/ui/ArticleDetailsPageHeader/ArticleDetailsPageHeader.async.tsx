import { lazy } from 'react';

export const ArticleDetailsPageHeaderAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => resolve(import('./ArticleDetailsPageHeader')), 1500);
    })
);
