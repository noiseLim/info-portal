import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import MainPage from './MainPage';

export default {
  title: 'pages/MainPage',
  component: MainPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator({})],
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = () => <MainPage />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
