import { Story, Meta } from '@storybook/react';
import { Bet } from './Bet';

export default {
  component: Bet,
  title: 'Bet',
} as Meta;

const Template: Story = (args) => <Bet {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
