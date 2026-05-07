import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchModal from './SearchModal';

const meta: Meta<typeof SearchModal> = {
  title: 'Components/SearchModal',
  component: SearchModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchModal>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};
