import { Layout } from '@after-dark-app/common-ui';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';

export function PokerRoom() {
  const router = useRouter();

  const roomId = router.query.roomId;

  return (
    <Layout>
      <Box>
        You&apos;re in room {roomId}. Imagine a poker game was going on here
      </Box>
    </Layout>
  );
}

export default PokerRoom;
