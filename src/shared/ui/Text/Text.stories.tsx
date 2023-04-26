import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Text, TextSize, TextTheme } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Lorem Ipsum',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
};

export const Error = Template.bind({});
Error.args = {
  title: 'Lorem Ipsum',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  theme: TextTheme.ERROR,
};

export const onlyTitle = Template.bind({});
onlyTitle.args = {
  title: 'Lorem Ipsum',
};

export const onlyText = Template.bind({});
onlyText.args = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: 'Lorem Ipsum',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
  title: 'Lorem Ipsum',
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark = Template.bind({});
onlyTextDark.args = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeS = Template.bind({});
SizeS.args = {
  title: 'Lorem Ipsum',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  size: TextSize.S,
};

export const SizeM = Template.bind({});
SizeM.args = {
  title: 'Lorem Ipsum',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  size: TextSize.M,
};

export const SizeL = Template.bind({});
SizeL.args = {
  title: 'Lorem Ipsum',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  size: TextSize.L,
};
