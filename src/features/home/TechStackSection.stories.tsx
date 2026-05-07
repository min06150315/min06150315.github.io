import type { Meta, StoryObj } from '@storybook/react-vite';
import TechStackSection from './TechStackSection';

const meta: Meta<typeof TechStackSection> = {
  title: 'Components/TechStackSection',
  component: TechStackSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TechStackSection>;

export const Default: Story = {
  args: {},
};