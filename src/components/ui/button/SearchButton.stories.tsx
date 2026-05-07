import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchButton from './SearchButton';

const meta: Meta<typeof SearchButton> = {
  title: 'Components/SearchButton',
  component: SearchButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchButton>;

export const Default: Story = {
  args: {},
};