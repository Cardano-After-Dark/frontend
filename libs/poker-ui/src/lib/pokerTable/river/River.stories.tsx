import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import { Story, Meta } from '@storybook/react';
import PokerCard, { Suits, CardValues } from '../../pokerCard/PokerCard';
import { River } from './River';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #4aad4a;
`;

export default {
  component: River,
  title: 'River',
} as Meta;

const Template: Story = (args) => (
  <Wrapper>
    <River {...args}>{args['children']}</River>
  </Wrapper>
);

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <Stack direction={'row'} spacing={1}>
      <PokerCard suit={Suits.Clubs} value={CardValues.Ace} scaleSize={0.7} />
      <PokerCard suit={Suits.Hearts} value={CardValues.King} scaleSize={0.7} />
      <PokerCard
        suit={Suits.Diamonds}
        value={CardValues.Eight}
        scaleSize={0.7}
      />
      <PokerCard suit={Suits.Spades} value={CardValues.Seven} scaleSize={0.7} />
      <PokerCard
        suit={Suits.Diamonds}
        value={CardValues.Eight}
        scaleSize={0.7}
      />
    </Stack>
  ),
};
