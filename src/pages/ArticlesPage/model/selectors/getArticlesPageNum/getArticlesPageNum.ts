import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesPageNum = (state: StateSchema) =>
  state.articlesPage?.page || 1;
