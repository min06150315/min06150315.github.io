import type { Meta, StoryObj } from '@storybook/react-vite';
import RecentPosts from './RecentPosts';

const meta: Meta<typeof RecentPosts> = {
  title: 'Components/RecentPosts',
  component: RecentPosts,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RecentPosts>;

export const Default: Story = {
  args: {},
};