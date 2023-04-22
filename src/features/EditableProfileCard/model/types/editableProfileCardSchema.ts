import { Profile } from '@/entities/Profile';

import { ValidateProfileError } from '../consts/editableProfileCardConsts';

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateErrors?: ValidateProfileError[];
}
