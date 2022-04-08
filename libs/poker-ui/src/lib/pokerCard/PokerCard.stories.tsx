import { Story, Meta } from '@storybook/react';
import { CardValues, PokerCard, Suits } from './PokerCard';

export default {
  component: PokerCard,
  title: 'PokerCard',
  argTypes: {
    suit: {
      options: ['Clubs', 'Hearts', 'Diamonds', 'Spades'],
      mapping: {
        Clubs: Suits.Clubs,
        Hearts: Suits.Hearts,
        Diamonds: Suits.Diamonds,
        Spades: Suits.Spades,
      },
      description: 'The suit of the card',
    },
  },
} as Meta;

const Template: Story = (args) => <PokerCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  suit: Suits.Clubs,
  value: CardValues.Ace,
};
