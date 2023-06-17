import { StoryObj, Meta } from '@storybook/react';
import Button from '@/components/button';

const meta: Meta<typeof Button> = {
  title: 'Components/Elements/Button',
  component: Button
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    className: 'bg-primary-900 rounded-md text-white p-2',
    children: 'Click me!'
  }
};

export const Secondary: Story = {
  args: {
    className: 'bg-gray-50 rounded-md text-black border border-slate-950  p-2',
    children: 'Click me!'
  }
};
export const Transparent: Story = {
  args: {
    className: 'bg-transparent rounded-md text-black underline p-2',
    children: 'Click me!'
  }
};
