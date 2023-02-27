import { DeepPartial } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/LoginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = { username: 'testtest' };
    expect(
      loginReducer(state as LoginSchema, loginActions.setUsername('tester'))
    ).toEqual({ username: 'tester' });
  });
  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = { password: '123' };
    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword('12345'))
    ).toEqual({ password: '12345' });
  });
});
