export type { UserSchema, User } from './model/types/user';

export { UserRole } from './model/consts/userConsts';

export { userReducer, userActions } from './model/slice/userSlice';

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';
export { getUserRoles } from './model/selectors/getUserRoles/getUserRoles';
export { getUserIsAdmin } from './model/selectors/getUserIsAdmin/getUserIsAdmin';
export { getUserIsManager } from './model/selectors/getUserIsManager/getUserIsManager';
