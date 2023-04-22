import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesPageSearch = (state: StateSchema) =>
  state.articlesPage?.search ?? '';
