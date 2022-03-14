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
    top: 0,
  },
  {
    left: '105%',
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
        padding: {
          xs: '4px',
          sm: '10px',
          lg: '20px',
        },
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...betPositions[position],
      }}
    >
      <Typography
        variant={'h4'}
        sx={{
          fontSize: { md: '2.3rem', lg: '2.5rem' },
        }}
      >
        {amount}
      </Typography>
    </Box>
  );
}

export default Bet;
