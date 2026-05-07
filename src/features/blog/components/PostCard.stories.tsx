import type { Meta, StoryObj } from '@storybook/react-vite';
import PostCard from './PostCard';

const meta: Meta<typeof PostCard> = {
  title: 'Components/PostCard',
  component: PostCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Default: Story = {
  args: {
    viewMode: 'grid',
    post: {
      id: 1,
      title: 'Sample Post Title',
      content:
        'This is a sample post content for testing the PostCard component.',
      created_at: new Date(),
      thumbnail_image: 'https://picsum.photos/400/225',
    },
  },
};
