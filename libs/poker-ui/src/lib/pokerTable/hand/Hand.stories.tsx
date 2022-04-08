import styled from '@emotion/styled';
import { Story, Meta } from '@storybook/react';
import PokerCard, { CardValues, Suits } from '../../pokerCard/PokerCard';
import { Hand } from './Hand';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #4aad4a;
`;

export default {
  component: Hand,
  title: 'Hand',
} as Meta;

const Template: Story = (args) => (
  <Wrapper>
    <Hand player={args['player']} />
  </Wrapper>
);

export const Primary = Template.bind({});
Primary.args = {
  player: {
    name: 'david',
    bank: 320,
    bet: 2300,
    cards: [
      <PokerCard
        suit={Suits.Clubs}
        value={CardValues.Ace}
        scaleSize={0.6}
        key={18}
      />,
      <PokerCard
        suit={Suits.Hearts}
        value={CardValues.King}
        scaleSize={0.6}
        key={188}
        tilt
      />,
    ],
  },
};
