import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';

import { getArticleDetailsData } from '../getArticleDetailsData/getArticleDetailsData';

export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getUserAuthData,
  (article, user) => {
    if (!article || !user) {
      return false;
    }
    return article.user.id === user.id;
  }
);
