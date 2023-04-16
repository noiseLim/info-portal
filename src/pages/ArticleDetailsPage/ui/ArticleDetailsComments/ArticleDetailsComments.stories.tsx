import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleDetailsComments } from './ArticleDetailsComments';

export default {
  title: 'pages/ArticleDetailsComments',
  component: ArticleDetailsComments,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsComments>;

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => (
  <ArticleDetailsComments {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
