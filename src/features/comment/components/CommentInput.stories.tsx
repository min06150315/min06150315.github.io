import type { Meta, StoryObj } from '@storybook/react-vite';
import CommentInput from './CommentInput';

const meta: Meta<typeof CommentInput> = {
  title: 'Components/CommentInput',
  component: CommentInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentInput>;

export const Default: Story = {
  args: {},
};