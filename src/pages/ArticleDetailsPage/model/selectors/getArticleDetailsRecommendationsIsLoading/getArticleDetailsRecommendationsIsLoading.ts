import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsRecommendationsIsLoading = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations?.isLoading;
