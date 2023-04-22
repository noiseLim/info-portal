import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesPageError = (state: StateSchema) =>
  state.articlesPage?.error;
