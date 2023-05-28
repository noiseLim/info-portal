import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from './CommentCard';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
);

const data = {
  comment: {
    id: '1',
    text: 'hello',
    user: { id: '1', username: 'Igor' },
  },
};

export const Normal = Template.bind({});
Normal.args = data;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = data;
NormalRedesigned.decorators = [
  FeaturesFlagsDecorator({ isAppRedesigned: true }),
];

export const Loading = Template.bind({});
Loading.args = {
  comment: {
    id: '1',
    text: 'hello',
    user: { id: '1', username: 'Igor' },
  },
  isLoading: true,
};
