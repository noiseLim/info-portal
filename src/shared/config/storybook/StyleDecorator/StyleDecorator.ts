import { Story } from '@storybook/react';

// eslint-disable-next-line noiselim-plugin/layer-imports
import '@/app/styles/index.scss';

export const StyleDecorator = (story: () => Story) => story();
