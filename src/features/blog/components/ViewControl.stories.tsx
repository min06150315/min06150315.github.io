import type { Meta, StoryObj } from '@storybook/react-vite';
import ViewControl from './ViewControl';

const meta: Meta<typeof ViewControl> = {
  title: 'Components/ViewControl',
  component: ViewControl,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ViewControl>;

export const Default: Story = {
  args: {},
};