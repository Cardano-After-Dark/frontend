import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { Story, Meta } from '@storybook/react';
import { Bet, BetPosition } from './Bet';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #4aad4a;
`;

export default {
  component: Bet,
  title: 'Bet',
} as Meta;

const Template: Story = (args) => (
  <Wrapper>
    <Box
      sx={{
        position: 'absolute',
        bottom: '50%',
        left: '50%',
      }}
    >
      <Typography variant="h5">Player here</Typography>
      <Bet amount={args['amount']} position={args['position']} {...args} />
    </Box>
  </Wrapper>
);

export const Primary = Template.bind({});
Primary.args = {
  amount: 123,
  position: BetPosition.Bottom,
};
