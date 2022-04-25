import styled from '@emotion/styled';
import { Story, Meta } from '@storybook/react';
import PokerCard from '../../pokerCard/PokerCard';
import { PlayerHand, Seats } from './PlayerHand';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #4aad4a;
`;

export default {
  component: PlayerHand,
  title: 'PlayerHand',
} as Meta;

const Template: Story = (args) => (
  <Wrapper>
    <PlayerHand position={args['position']} player={args['player']} {...args} />
  </Wrapper>
);

export const Primary = Template.bind({});
Primary.args = {
  position: Seats.Seat1,
  player: {
    name: 'Henry',
    bank: 890,
    bet: 1300,
    cards: [
      <PokerCard scaleSize={0.5} key={12} />,
      <PokerCard scaleSize={0.5} key={122} tilt />,
    ],
  },
};
