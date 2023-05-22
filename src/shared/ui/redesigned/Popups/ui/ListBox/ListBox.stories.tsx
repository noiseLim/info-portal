import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 100 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
  <ListBox {...args} />
);

const items = [
  { content: 'Content', value: 'value' },
  { content: 'Content 2', value: 'value 2' },
];

export const Normal = Template.bind({});
Normal.args = {
  items,
  value: 'value',
};

export const topLeft = Template.bind({});
topLeft.args = {
  items,
  direction: 'top left',
  value: 'value',
};

export const topRight = Template.bind({});
topRight.args = {
  items,
  direction: 'top right',
  value: 'value',
};

export const bottomLeft = Template.bind({});
bottomLeft.args = {
  items,
  direction: 'bottom left',
  value: 'value',
};

export const bottomRight = Template.bind({});
bottomRight.args = {
  items,
  direction: 'bottom right',
  value: 'value',
};
