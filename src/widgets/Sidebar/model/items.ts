import React from 'react';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20x20.svg';
import MainIcon from 'shared/assets/icons/main-20x20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20x20.svg';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGAttributes<SVGElement>>;
}

export const SidebarItemsList: SidebarItemType[] = [
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
  {
    path: RoutePath.profile,
    Icon: ProfileIcon,
    text: 'Profile',
  },
];
