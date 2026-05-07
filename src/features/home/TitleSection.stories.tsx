import type { Meta, StoryObj } from '@storybook/react-vite';
import TitleSection from './TitleSection';

const meta: Meta<typeof TitleSection> = {
  title: 'Components/TitleSection',
  component: TitleSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TitleSection>;

export const Default: Story = {
  args: {},
};