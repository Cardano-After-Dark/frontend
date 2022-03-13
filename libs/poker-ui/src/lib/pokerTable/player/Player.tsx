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
    },
    bet: BetPosition.Bottom,
  },
  {
    // top left corner
    player: {
      top: 30,
      left: 30,
    },
    bet: BetPosition.Bottom,
  },
  {
    player: {
      top: '50%',
      left: 30,
      transform: 'translateY(-50%)',
    },
    bet: BetPosition.Right,
  },
  {
    player: {
      top: 30,
      right: 230,
    },
    bet: BetPosition.Left,
  },
  {
    player: {
      top: '50%',
      right: 30,
      transform: 'translateY(-50%)',
    },
    bet: BetPosition.Left,
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
