import { Story, Meta } from '@storybook/react';
import { PokerTable } from './PokerTable';

export default {
  component: PokerTable,
  title: 'PokerTable',
} as Meta;

const Template: Story = (args) => <PokerTable {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
