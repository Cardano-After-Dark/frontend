import { Layout } from '@after-dark-app/common-ui';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { PokerGame } from '../../components/PokerGame';

export function PokerRoom() {
  const router = useRouter();
  const roomId = router.query.roomId;

  return (
    <Layout>
      <Box
        sx={{
          position: 'relative',
          height: '100%',
        }}
      >
        <PokerGame />
      </Box>
    </Layout>
  );
}

export default PokerRoom;
