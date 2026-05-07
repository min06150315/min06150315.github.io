import type { Meta, StoryObj } from '@storybook/react-vite';
import BlogEditor from './BlogEditor';

const meta: Meta<typeof BlogEditor> = {
  title: 'Components/BlogEditor',
  component: BlogEditor,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BlogEditor>;

export const Default: Story = {
  args: {},
};