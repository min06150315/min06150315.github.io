import type { Meta, StoryObj } from '@storybook/react-vite';
import CommentItem from './CommentItem';

const meta: Meta<typeof CommentItem> = {
  title: 'Components/CommentItem',
  component: CommentItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentItem>;

export const Default: Story = {
  args: {
    comment: {
      id: 1,
      post_id: 1,
      user_id: '1',
      author_name: 'KyeongBin Min',
      author_avatar: 'https://avatars.githubusercontent.com/u/143686593?v=4',
      content: 'Comment Test',
      created_at: new Date(),
    },
  },
};
