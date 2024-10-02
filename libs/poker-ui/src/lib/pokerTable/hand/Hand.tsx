import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Bet, BetPosition } from '../bet/Bet';
import { Player } from '../PokerTable';

type HandProps = {
  player: Player;
};

export function Hand({ player }: HandProps) {
  const { cards, name, bank, bet, turn } = player;
  return (
    <Box
      sx={{
        background: turn
          ? 'rgba(255, 255, 255, 0.5)'
          : 'rgba(255, 255, 255, 0.2)',
        border: turn
          ? '5px solid rgba(245, 16, 16, 0.75)'
          : '5px solid rgba(255, 255, 255, 0.05)',
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
        }),
        borderRadius: 3,
        padding: '5px',
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
      {cards && (
        <Stack direction={'row'} spacing={-1}>
          {cards}
        </Stack>
      )}
      <Box
        sx={{
          height: '100%',
          marginLeft: '10px',
          padding: '20px',
        }}
      >
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1">{bank}</Typography>
      </Box>
    </Box>
  );
}

export default Hand;
