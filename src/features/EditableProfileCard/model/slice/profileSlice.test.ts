import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { profileActions, profileReducer } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCardSchema';
import { ValidateProfileError } from '../consts/editableProfileCardConsts';

const data = {
  first: 'Иван',
  lastname: 'Иванов',
  age: 22,
  currency: Currency.EUR,
  country: Country.Armenia,
  city: 'Moscow',
  username: 'admin',
};

describe('profileSlice', () => {
  test('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };
    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true))
    ).toEqual({ readonly: true });
  });

  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };
    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit())
    ).toEqual({
      readonly: true,
      data,
      form: data,
      validateErrors: undefined,
    });
  });

  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = {
      form: { username: 'Ivan' },
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({
          username: 'Maksim',
        })
      )
    ).toEqual({
      form: { username: 'Maksim' },
    });
  });

  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    };
    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending)
    ).toEqual({
      isLoading: true,
      validateErrors: undefined,
    });
  });

  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, '')
      )
    ).toEqual({
      isLoading: false,
      validateErrors: undefined,
      readonly: true,
      form: data,
      data,
    });
  });
});
