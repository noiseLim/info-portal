import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { articleDetailsReducer } from './articleDetailsSlice';

const data = {
  id: '1',
  title: 'JavaScript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
  user: {
    id: '1',
    username: 'admin',
  },
  type: [],
  blocks: [],
};

describe('articleDetailsSlice', () => {
  test('test fetch articleDetails pending', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      error: undefined,
      isLoading: false,
    };
    expect(
      articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.pending
      )
    ).toEqual({
      isLoading: true,
      error: undefined,
    });
  });

  test('test fetch articleDetails service fulfilled', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: true,
      data: undefined,
    };
    expect(
      articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.fulfilled(data, '', '')
      )
    ).toEqual({
      isLoading: false,
      data,
    });
  });
});
