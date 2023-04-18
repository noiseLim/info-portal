import { createSelector } from '@reduxjs/toolkit';

import { getUserRoles } from '../getUserRoles/getUserRoles';
import { UserRole } from '../../consts/userConsts';

export const getUserIsManager = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes(UserRole.MANAGER))
);
