import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

import { getArticlesPageLimit } from '../../selectors/getArticlesPageLimit/getArticlesPageLimit';

interface FetchArticlesListProps {
  page?: number;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkAPI) => {
  const { extra, rejectWithValue, getState } = thunkAPI;

  const { page = 1 } = props;
  const limit = getArticlesPageLimit(getState());

  try {
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _page: page,
        _limit: limit,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);

    return rejectWithValue('error');
  }
});
