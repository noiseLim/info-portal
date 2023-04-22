import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesPageIsLoading = (state: StateSchema) =>
  state.articlesPage?.isLoading || false;
