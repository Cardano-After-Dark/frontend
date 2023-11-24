import { theme } from '../../theme';
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
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '135px',
        height: '60px',
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
      [theme.breakpoints.down('md')]: {
        top: '15%',
        left: 0,
        width: '135px',
        height: '60px',
      },
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
      [theme.breakpoints.down('md')]: {
        top: '15%',
        right: 0,
        width: '135px',
        height: '60px',
      },
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
      [theme.breakpoints.down('md')]: {
        top: '30%',
        left: 0,
        width: '135px',
        height: '60px',
      },
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
      [theme.breakpoints.down('md')]: {
        top: '65%',
        left: 0,
        width: '135px',
        height: '60px',
      },
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
      [theme.breakpoints.down('md')]: {
        top: '65%',
        right: 0,
        width: '135px',
        height: '60px',
      },
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
      [theme.breakpoints.down('md')]: {
        top: '30%',
        right: 0,
        width: '135px',
        height: '60px',
      },
      [theme.breakpoints.up('md')]: {
        top: '40%',
        left: 30,
        transform: 'translateY(-50%)',
      },
    },
    bet: BetPosition.Right,
  },
];

export function PlayerHand({ position, player }: PlayerProps) {
  const { cards, name, bank, bet, turn } = player;

  return (
    <Box
      sx={{borderRadius: 3,
        padding: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        background: turn ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)',
        border: turn ? '5px solid rgba(245, 16, 16, 0.75)' : '5px solid rgba(255, 255, 255, 0.05)',
        ...playerPositions[position].player,
        ...(turn && {
          animation: 'flash 2.5s infinite',
          '@keyframes flash': {
            '0%, 100%': {
              borderColor: 'rgba(255, 255, 255, 0.05)',
            },
            '50%': {
              borderColor: 'rgba(245, 16, 16, 0.75)',
            },
          },
        })
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

export default PlayerHand;
