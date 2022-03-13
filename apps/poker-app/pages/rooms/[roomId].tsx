import { Layout } from '@after-dark-app/common-ui';
import { CardValues, PokerCard, Suits } from '@after-dark-app/poker-ui';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';

export function PokerRoom() {
  const router = useRouter();

  const roomId = router.query.roomId;

  return (
    <Layout>
      <Box>
        You&apos;re in room {roomId}. Imagine a poker game was going on here
        <Stack direction={'row'} spacing={2}>
          <PokerCard
            suit={Suits.Clubs}
            value={CardValues.Ace}
            scaleSize={1.5}
          />
          <PokerCard suit={Suits.Hearts} value={CardValues.King} />
          <PokerCard suit={Suits.Diamonds} value={CardValues.Eight} />
          <PokerCard suit={Suits.Spades} value={CardValues.Seven} />
          <PokerCard suit={Suits.Diamonds} value={CardValues.Eight} />
        </Stack>
      </Box>
    </Layout>
  );
}

export default PokerRoom;
