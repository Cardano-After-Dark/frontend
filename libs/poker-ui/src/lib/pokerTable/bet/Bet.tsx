import { theme } from '@after-dark-app/common-ui';
import { Chip, Typography } from '@mui/material';
import { Box, color } from '@mui/system';

export enum BetPosition {
  Left,
  Right,
  Top,
  Bottom,
  BottomRight,
  BottomLeft,
}

const betPositions = [
  {
    right: '102%',
    top: 0,
  },
  {
    left: '102%',
    top: 0,
  },
  {
    bottom: '105%',
    right: 0,
  },
  {
    top: '105%',
    right: 0,
  },
  {
    top: '105%',
    left: '102%',
  },
  {
    top: '105%',
    right: '102%',
  },
];

type BetProps = {
  amount: number;
  position: BetPosition;
};

export function Bet({ amount, position }: BetProps) {
  return (
    <Chip
      sx={{
        position: 'absolute',
        [theme.breakpoints.down('md')]: {
          ...betPositions[BetPosition.Bottom],
        },
        [theme.breakpoints.up('md')]: {
          ...betPositions[position],
        },
      }}
      color="info"
      label={amount}
    />
  );
}

export default Bet;
