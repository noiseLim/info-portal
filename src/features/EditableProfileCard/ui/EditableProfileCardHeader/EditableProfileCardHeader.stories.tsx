import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditableProfileCardHeader } from './EditableProfileCardHeader';

export default {
  title: 'features/EditableProfileCardHeader',
  component: EditableProfileCardHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditableProfileCardHeader>;

const Template: ComponentStory<typeof EditableProfileCardHeader> = (args) => (
  <EditableProfileCardHeader {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
