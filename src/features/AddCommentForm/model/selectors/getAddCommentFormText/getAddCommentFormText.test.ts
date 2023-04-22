import { StateSchema } from '@/app/providers/StoreProvider';
import { getAddCommentFormText } from './getAddCommentFormText';

describe('getAddCommentFormText', () => {
  test('should return value', () => {
    const state: DeepPartial<StateSchema> = {
      addCommentForm: {
        text: 'some text',
      },
    };
    expect(getAddCommentFormText(state as StateSchema)).toEqual('some text');
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {
      addCommentForm: {},
    };
    expect(getAddCommentFormText(state as StateSchema)).toEqual('');
  });
});
