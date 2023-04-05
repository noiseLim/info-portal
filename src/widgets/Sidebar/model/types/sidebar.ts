import React from 'react';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGAttributes<SVGElement>>;
  authOnly?: boolean;
}
