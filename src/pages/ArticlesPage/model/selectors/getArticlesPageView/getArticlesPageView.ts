import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

export const getArticlesPageView = (state: StateSchema) =>
  state.articlesPage?.view || ArticleView.TILE;
