import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import avatar from 'shared/assets/tests/storybook.jpg';
import ProfilePage from './ProfilePage';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => (
  <ProfilePage {...(args as typeof ProfilePage)} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  StoreDecorator({
    profile: {
      form: {
        first: 'Иван',
        lastname: 'Иванов',
        age: 22,
        currency: Currency.EUR,
        country: Country.Armenia,
        city: 'Moscow',
        username: 'admin',
        avatar,
      },
    },
  }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      form: {
        first: 'Иван',
        lastname: 'Иванов',
        age: 22,
        currency: Currency.EUR,
        country: Country.Armenia,
        city: 'Moscow',
        username: 'admin',
        avatar,
      },
    },
  }),
];
