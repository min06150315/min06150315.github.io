import type { Meta, StoryObj } from '@storybook/react-vite';
import JourneySection from './JourneySection';

const meta: Meta<typeof JourneySection> = {
  title: 'Components/JourneySection',
  component: JourneySection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JourneySection>;

export const Default: Story = {
  args: {},
};