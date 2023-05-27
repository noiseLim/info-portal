import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags, setFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagOptions {
  userId: string;
  newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlags = createAsyncThunk<
  void,
  UpdateFeatureFlagOptions,
  ThunkConfig<string>
>('user/saveJsonSettings', async ({ userId, newFeatures }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  const getAllFeatures = {
    ...getAllFeatureFlags(),
    ...newFeatures,
  };

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: getAllFeatures,
      })
    );

    setFeatureFlags(getAllFeatures);

    return undefined;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return rejectWithValue('');
  }
});
