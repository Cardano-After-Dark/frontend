import { theme } from '@after-dark-app/common-ui';
import { Typography } from '@mui/material';
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
      top: 30,
      left: '50%',
      transform: 'translateX(-50%)',
      [theme.breakpoints.up('md')]: {},
    },
    bet: BetPosition.Bottom,
  },
  {
    // top left corner
    player: {
      top: 30,
      left: 50,
      [theme.breakpoints.up('md')]: {},
    },
    bet: BetPosition.Bottom,
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
    bet: BetPosition.Bottom,
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
    bet: BetPosition.Bottom,
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
    bet: BetPosition.Bottom,
  },
];

export function Player({ position, player }: PlayerProps) {
  const { cards, name, bank, bet } = player;
  return (
    <Box
      sx={{
        border: `3px solid rgba(255, 255, 255, 0.2)`,
        borderRadius: 3,
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        ...playerPositions[position].player,
      }}
    >
      {bet && <Bet amount={bet} position={playerPositions[position].bet} />}
      {cards && cards}
      <Box
        sx={{
          height: '100%',
          marginLeft: '5px',
          padding: '5px',
        }}
      >
        <Typography variant="h5">{name}</Typography>
        <Box>{bank}</Box>
      </Box>
    </Box>
  );
}

export default Player;
