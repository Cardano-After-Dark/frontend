import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Bet, BetPosition } from '../bet/Bet';
import { Player } from '../PokerTable';

type HandProps = {
  player: Player;
};

export function Hand({ player }: HandProps) {
  const { cards, name, bank, bet } = player;
  return (
    <Box
      sx={{
        border: `3px solid rgba(255, 255, 255, 0.2)`,
        borderRadius: 3,
        padding: '20px',
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {bet && <Bet amount={bet} position={BetPosition.Top} />}
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

export default Hand;
