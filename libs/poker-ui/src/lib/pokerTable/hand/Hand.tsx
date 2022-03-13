import { Box } from '@mui/system';
import { Player } from '../PokerTable';

type HandProps = Player;

export function Hand({ cards }: HandProps) {
  return (
    <Box
      sx={{
        border: `3px solid rgba(255, 255, 255, 0.2)`,
        borderRadius: 3,
        width: 200,
        height: 100,
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {cards && cards}
    </Box>
  );
}

export default Hand;
