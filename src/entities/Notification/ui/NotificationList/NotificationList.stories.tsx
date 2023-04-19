import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NotificationList } from './NotificationList';

export default {
  title: 'entities/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
  <NotificationList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
