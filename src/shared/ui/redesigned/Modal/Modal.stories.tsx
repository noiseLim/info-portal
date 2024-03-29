import { ComponentStory, ComponentMeta } from '@storybook/react';

// import { Theme } from '@/shared/const/theme';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cummolestiae impedit voluptas harum neque omnis ducimus rem voluptatum incidunt, quaerat quae asperiores iste eos ea perferendis expedita soluta quos!',
};

// export const Dark = Template.bind({});
// Dark.args = {
//   isOpen: true,
//   children:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cummolestiae impedit voluptas harum neque omnis ducimus rem voluptatum incidunt, quaerat quae asperiores iste eos ea perferendis expedita soluta quos!',
// };
// Dark.decorators = [ThemeDecorator(Theme.DARK)];
