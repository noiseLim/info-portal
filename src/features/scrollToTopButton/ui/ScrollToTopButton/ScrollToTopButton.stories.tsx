import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ScrollToTopButton } from './ScrollToTopButton';

export default {
  title: 'features/scrollToTopButton',
  component: ScrollToTopButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ScrollToTopButton>;

const Template: ComponentStory<typeof ScrollToTopButton> = (args) => (
  <ScrollToTopButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
