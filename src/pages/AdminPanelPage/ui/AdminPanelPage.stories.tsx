import { ComponentStory, ComponentMeta } from '@storybook/react';

import AdminPanelPage from './AdminPanelPage';

export default {
  title: 'entities/AdminPanelPage',
  component: AdminPanelPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AdminPanelPage>;

const Template: ComponentStory<typeof AdminPanelPage> = (args) => (
  <AdminPanelPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
