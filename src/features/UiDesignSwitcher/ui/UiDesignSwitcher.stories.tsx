import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UiDesignSwitcher } from './UiDesignSwitcher';

export default {
  title: 'entities/uiDesignSwitcher',
  component: UiDesignSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UiDesignSwitcher>;

const Template: ComponentStory<typeof UiDesignSwitcher> = (args) => (
  <UiDesignSwitcher {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
