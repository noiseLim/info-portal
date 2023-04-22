import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesPageOrder = (state: StateSchema) =>
  state.articlesPage?.order ?? 'asc';
