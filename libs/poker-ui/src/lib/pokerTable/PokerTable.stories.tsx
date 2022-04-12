import { Stack } from '@mui/material';
import { Story, Meta } from '@storybook/react';
import PokerCard, { CardValues, Suits } from '../pokerCard/PokerCard';
import { PokerTable } from './PokerTable';

export default {
  component: PokerTable,
  title: 'PokerTable',
} as Meta;

const Template: Story = (args) => (
  <PokerTable
    hand={args['hand']}
    players={args['players']}
    river={args['river']}
    {...args}
  />
);

export const Primary = Template.bind({});
Primary.args = {
  hand: {
    name: 'david',
    bank: 320,
    bet: 2300,
    cards: [
      <PokerCard
        suit={Suits.Clubs}
        value={CardValues.Ace}
        scaleSize={0.4}
        key={18}
      />,
      <PokerCard
        suit={Suits.Hearts}
        value={CardValues.King}
        scaleSize={0.4}
        key={188}
        tilt
      />,
    ],
  },
  players: [
    {
      name: 'Henry',
      bank: 890,
      bet: 1300,
      cards: [
        <PokerCard scaleSize={0.3} key={1} />,
        <PokerCard scaleSize={0.3} key={11} tilt />,
      ],
    },
    {
      name: 'Henry',
      bank: 890,
      bet: 1300,
      cards: [
        <PokerCard scaleSize={0.3} key={12} />,
        <PokerCard scaleSize={0.3} key={122} tilt />,
      ],
    },
    {
      name: 'Henry',
      bank: 890,
      bet: 1300,
      cards: [
        <PokerCard scaleSize={0.3} key={13} />,
        <PokerCard scaleSize={0.3} key={133} tilt />,
      ],
    },
    {
      name: 'Henry',
      bank: 890,
      bet: 1300,
      cards: [
        <PokerCard scaleSize={0.3} key={14} />,
        <PokerCard scaleSize={0.3} key={144} tilt />,
      ],
    },
    {
      name: 'Henry',
      bank: 890,
      bet: 200,
      cards: [
        <PokerCard scaleSize={0.3} key={15} />,
        <PokerCard scaleSize={0.3} key={155} tilt />,
      ],
    },
    {
      name: 'Henry',
      bank: 890,
      bet: 200,
      cards: [
        <PokerCard scaleSize={0.3} key={16} />,
        <PokerCard scaleSize={0.3} key={166} tilt />,
      ],
    },
    {
      name: 'Henry',
      bank: 890,
      bet: 200,
      cards: [
        <PokerCard scaleSize={0.3} key={17} />,
        <PokerCard scaleSize={0.3} key={177} tilt />,
      ],
    },
  ],
  river: (
    <Stack direction={'row'} spacing={1}>
      <PokerCard suit={Suits.Clubs} value={CardValues.Ace} scaleSize={0.5} />
      <PokerCard suit={Suits.Hearts} value={CardValues.King} scaleSize={0.5} />
      <PokerCard
        suit={Suits.Diamonds}
        value={CardValues.Eight}
        scaleSize={0.5}
      />
      <PokerCard suit={Suits.Spades} value={CardValues.Seven} scaleSize={0.5} />
      <PokerCard
        suit={Suits.Diamonds}
        value={CardValues.Eight}
        scaleSize={0.5}
      />
    </Stack>
  ),
};
