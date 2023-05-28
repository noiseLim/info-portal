import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

import { ProfileCard } from './ProfileCard';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

const primaryArgs = {
  data: {
    first: 'Иван',
    lastname: 'Иванов',
    age: 22,
    currency: Currency.EUR,
    country: Country.Armenia,
    city: 'Moscow',
    username: 'admin',
    avatar,
  },
};

export const Primary = Template.bind({});
Primary.args = primaryArgs;

export const PrimaryDarkRedesigned = Template.bind({});
PrimaryDarkRedesigned.args = primaryArgs;
PrimaryDarkRedesigned.decorators = [
  NewDesignDecorator,
  ThemeDecorator(Theme.DARK),
];

export const withError = Template.bind({});
withError.args = {
  error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
