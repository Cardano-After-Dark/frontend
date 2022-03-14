import { theme } from '@after-dark-app/common-ui';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Bet, BetPosition } from '../bet/Bet';
import { Player } from '../PokerTable';

export enum Seats {
  Seat1,
  Seat2,
  Seat3,
  Seat4,
  Seat5,
  Seat6,
  Seat7,
}

type PlayerConfig = {
  position: Seats;
  player: Player;
};

type PlayerProps = PlayerConfig;

const playerPositions = [
  {
    // Player across from user
    player: {
      [theme.breakpoints.down('md')]: {
        top: 30,
        left: '50%',
        transform: 'translateX(-50%)',
      },
      [theme.breakpoints.up('md')]: {
        top: 30,
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
    bet: BetPosition.Bottom,
  },
  {
    // top left corner
    player: {
      [theme.breakpoints.up('md')]: {
        top: 30,
        left: 50,
      },
    },
    bet: BetPosition.BottomRight,
  },
  {
    // bottom left corner
    player: {
      [theme.breakpoints.up('md')]: {
        top: '70%',
        left: 30,
        transform: 'translateY(-50%)',
      },
    },
    bet: BetPosition.Right,
  },
  {
    // top right corner
    player: {
      [theme.breakpoints.up('md')]: {
        top: 30,
        right: 50,
      },
    },
    bet: BetPosition.BottomLeft,
  },
  {
    // top right side
    player: {
      [theme.breakpoints.up('md')]: {
        top: '40%',
        right: 30,
        transform: 'translateY(-50%)',
      },
    },
    bet: BetPosition.Left,
  },
  {
    // bottom right corner
    player: {
      [theme.breakpoints.up('md')]: {
        top: '70%',
        right: 30,
        transform: 'translateY(-50%)',
      },
    },
    bet: BetPosition.Left,
  },
  {
    // top left side
    player: {
      [theme.breakpoints.up('md')]: {
        top: '40%',
        left: 30,
        transform: 'translateY(-50%)',
      },
    },
    bet: BetPosition.Right,
  },
];

export function Player({ position, player }: PlayerProps) {
  const { cards, name, bank, bet } = player;
  return (
    <Box
      sx={{
        borderRadius: 3,
        padding: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        background: 'rgba(255, 255, 255, 0.2)',
        ...playerPositions[position].player,
      }}
    >
      {bet && <Bet amount={bet} position={playerPositions[position].bet} />}
      {cards && (
        <Stack direction={'row'} spacing={-1}>
          {cards}
        </Stack>
      )}
      <Box
        sx={{
          height: '100%',
          marginLeft: '10px',
          padding: {
            xs: 0,
            md: '5px',
          },
        }}
      >
        <Typography variant="h5">{name}</Typography>
        <Box>{bank}</Box>
      </Box>
    </Box>
  );
}

export default Player;
