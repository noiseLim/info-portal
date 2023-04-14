import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Flex } from './Flex';

export default {
  title: 'shared/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

const items = (
  <>
    <div>item</div>
    <div>item</div>
    <div>item</div>
    <div>item</div>
  </>
);

export const Row = Template.bind({});
Row.args = {
  children: items,
};

export const Column = Template.bind({});
Column.args = {
  direction: 'column',
  children: items,
};

export const ColumnAligneCenter = Template.bind({});
ColumnAligneCenter.args = {
  direction: 'column',
  align: 'center',
  children: items,
};

export const ColumnAligneEnd = Template.bind({});
ColumnAligneEnd.args = {
  direction: 'column',
  align: 'end',
  children: items,
};

export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
  direction: 'column',
  gap: '16',
  children: items,
};
export const ColumnGap32 = Template.bind({});
ColumnGap32.args = {
  direction: 'column',
  gap: '32',
  children: items,
};

export const RowGap4 = Template.bind({});
RowGap4.args = {
  gap: '4',
  children: items,
};

export const RowGap8 = Template.bind({});
RowGap8.args = {
  gap: '8',
  children: items,
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
  gap: '16',
  children: items,
};

export const RowGap32 = Template.bind({});
RowGap32.args = {
  gap: '32',
  children: items,
};
