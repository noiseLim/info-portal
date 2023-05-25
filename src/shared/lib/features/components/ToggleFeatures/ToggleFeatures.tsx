import { ReactElement, memo } from 'react';

import { FeatureFlags } from '../../../../types/featureFlags';
import { getFeatureFlags } from '../../lib/setGetFeatures';

interface ToggleFeaturesProps {
  feature: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}
export const ToggleFeatures = memo((props: ToggleFeaturesProps) => {
  const { feature, on, off } = props;

  if (getFeatureFlags(feature)) {
    return on;
  }

  return off;
});
