import { Box } from '@mui/system';
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
};

type PlayerProps = Player & PlayerConfig;

const playerPositions = [
  {
    top: 30,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  {
    top: 30,
    left: 30,
  },
  {
    top: '50%',
    left: 30,
    transform: 'translateY(-50%)',
  },
  {
    top: 30,
    right: 230,
  },
  {
    top: '50%',
    right: 30,
    transform: 'translateY(-50%)',
  },
];

export function Player({ cards, position }: PlayerProps) {
  return (
    <Box
      sx={{
        border: `3px solid rgba(255, 255, 255, 0.2)`,
        borderRadius: 3,
        width: 200,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        padding: '10px',
        ...playerPositions[position],
      }}
    >
      {cards && cards}
      <Box
        sx={{
          width: 60,
          height: '100%',
          marginLeft: '5px',
          padding: '5px',
        }}
      >
        Profile / bet / name
      </Box>
    </Box>
  );
}

export default Player;
