import { Story, Meta } from '@storybook/react';
import { PokerCard } from './PokerCard';

export default {
  component: PokerCard,
  title: 'PokerCard',
} as Meta;

const Template: Story = (args) => <div>hi</div>;

export const Primary = Template.bind({});
Primary.args = {};
