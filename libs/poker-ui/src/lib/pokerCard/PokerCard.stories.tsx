import { Story, Meta } from '@storybook/react';
import { CardValues, PokerCard, Suits } from './PokerCard';

export default {
  component: PokerCard,
  title: 'Poker Card',
} as Meta;

const Template: Story = (args) => (
  <PokerCard suit={args['suit']} value={args['value']} {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  suit: Suits.Clubs,
  value: CardValues.Eight,
};
