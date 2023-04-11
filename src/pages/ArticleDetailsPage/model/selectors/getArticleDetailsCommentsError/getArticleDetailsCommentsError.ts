import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsCommentsError = (state: StateSchema) =>
  state.articleDetailsPage?.comments?.error;
