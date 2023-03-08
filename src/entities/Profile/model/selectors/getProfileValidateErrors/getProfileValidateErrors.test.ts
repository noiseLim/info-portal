import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileError } from 'entities/profile';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateError', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileError.INCORRECT_AGE,
          ValidateProfileError.INCORRECT_USER_DATA,
        ],
      },
    };
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_USER_DATA,
    ]);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
