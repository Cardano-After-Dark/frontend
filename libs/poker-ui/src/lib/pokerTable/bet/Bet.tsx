import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export enum BetPosition {
  Left,
  Right,
  Top,
  Bottom,
}

const betPositions = [
  {
    right: '105%',
  },
  {
    left: '105%',
  },
  {
    top: '-110px',
  },
  {
    bottom: '-110px',
  },
];

type BetProps = {
  amount: number;
  position: BetPosition;
};

export function Bet({ amount, position }: BetProps) {
  return (
    <Box
      sx={{
        border: `3px solid rgba(255, 255, 255, 0.2)`,
        borderRadius: 3,
        padding: '20px',
        width: 'auto',
        height: 100,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...betPositions[position],
      }}
    >
      <Typography variant="h2">{amount}</Typography>
    </Box>
  );
}

export default Bet;
