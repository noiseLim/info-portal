import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import MainIcon from '@/shared/assets/icons/main-20x20.svg';
import AboutIcon from '@/shared/assets/icons/about-20x20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20x20.svg';
import ArticleIcon from '@/shared/assets/icons/article-20x20.svg';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.main,
      Icon: MainIcon,
      text: 'Main',
    },
    {
      path: RoutePath.about,
      Icon: AboutIcon,
      text: 'About us',
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: RoutePath.profile + userData.id,
        Icon: ProfileIcon,
        text: 'Profile',
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        Icon: ArticleIcon,
        text: 'Articles',
        authOnly: true,
      }
    );
  }
  return sidebarItemsList;
});
