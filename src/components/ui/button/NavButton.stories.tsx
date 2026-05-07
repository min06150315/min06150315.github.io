import type { Meta, StoryObj } from '@storybook/react-vite';
import NavButton from './NavButton';

const meta: Meta<typeof NavButton> = {
  title: 'Components/NavButton',
  component: NavButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavButton>;

export const Default: Story = {
  args: {
    type: 'submit',
    variant: 'primary',
    children: 'Button',
    className: 'px-6 py-2 rounded-full disabled:opacity-50 cursor-pointer',
    disabled: false,
  },
};
