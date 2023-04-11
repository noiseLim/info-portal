import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsRecommendationsError = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations?.error;
