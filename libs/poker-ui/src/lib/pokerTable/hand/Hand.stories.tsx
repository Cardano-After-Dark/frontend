import { Story, Meta } from '@storybook/react';
import { Hand } from './Hand';

export default {
  component: Hand,
  title: 'Hand',
} as Meta;

const Template: Story = (args) => <Hand {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
