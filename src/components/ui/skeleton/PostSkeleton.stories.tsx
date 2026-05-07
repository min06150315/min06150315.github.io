import type { Meta, StoryObj } from '@storybook/react-vite';
import PostSkeleton from './PostSkeleton';

const meta: Meta<typeof PostSkeleton> = {
  title: 'Components/PostSkeleton',
  component: PostSkeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostSkeleton>;

export const Default: Story = {
  args: {},
};