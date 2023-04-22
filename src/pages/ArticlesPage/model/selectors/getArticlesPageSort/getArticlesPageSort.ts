import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleSortField } from '@/entities/Article';

export const getArticlesPageSort = (state: StateSchema) =>
  state.articlesPage?.sort ?? ArticleSortField.CREATED;
