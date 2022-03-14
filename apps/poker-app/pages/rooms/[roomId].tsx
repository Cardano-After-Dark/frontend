import { Layout } from '@after-dark-app/common-ui';
import {
  CardValues,
  PokerCard,
  PokerTable,
  Suits,
} from '@after-dark-app/poker-ui';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';

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
        <PokerTable
          players={[
            {
              name: 'Henry',
              bank: 890,
              bet: 1300,
              cards: (
                <Stack direction={'row'} spacing={1}>
                  <PokerCard scaleSize={0.5} />
                  <PokerCard scaleSize={0.5} />
                </Stack>
              ),
            },
            {
              name: 'Henry',
              bank: 890,
              bet: 1300,
              cards: (
                <Stack direction={'row'} spacing={1}>
                  <PokerCard scaleSize={0.5} />
                  <PokerCard scaleSize={0.5} />
                </Stack>
              ),
            },
            {
              name: 'Henry',
              bank: 890,
              bet: 1300,
              cards: (
                <Stack direction={'row'} spacing={1}>
                  <PokerCard scaleSize={0.5} />
                  <PokerCard scaleSize={0.5} />
                </Stack>
              ),
            },
            {
              name: 'Henry',
              bank: 890,
              bet: 1300,
              cards: (
                <Stack direction={'row'} spacing={1}>
                  <PokerCard scaleSize={0.5} />
                  <PokerCard scaleSize={0.5} />
                </Stack>
              ),
            },
            {
              name: 'Henry',
              bank: 890,
              bet: 200,
              cards: (
                <Stack direction={'row'} spacing={1}>
                  <PokerCard scaleSize={0.5} />
                  <PokerCard scaleSize={0.5} />
                </Stack>
              ),
            },
            {
              name: 'Henry',
              bank: 890,
              bet: 200,
              cards: (
                <Stack direction={'row'} spacing={1}>
                  <PokerCard scaleSize={0.5} />
                  <PokerCard scaleSize={0.5} />
                </Stack>
              ),
            },
            {
              name: 'Henry',
              bank: 890,
              bet: 200,
              cards: (
                <Stack direction={'row'} spacing={1}>
                  <PokerCard scaleSize={0.5} />
                  <PokerCard scaleSize={0.5} />
                </Stack>
              ),
            },
          ]}
          hand={{
            name: 'david',
            bank: 320,
            bet: 2300,
            cards: (
              <Stack direction={'row'} spacing={1}>
                <PokerCard
                  suit={Suits.Clubs}
                  value={CardValues.Ace}
                  scaleSize={0.5}
                />
                <PokerCard
                  suit={Suits.Hearts}
                  value={CardValues.King}
                  scaleSize={0.5}
                />
              </Stack>
            ),
          }}
          river={
            <Stack direction={'row'} spacing={1}>
              <PokerCard
                suit={Suits.Clubs}
                value={CardValues.Ace}
                scaleSize={0.6}
              />
              <PokerCard
                suit={Suits.Hearts}
                value={CardValues.King}
                scaleSize={0.6}
              />
              <PokerCard
                suit={Suits.Diamonds}
                value={CardValues.Eight}
                scaleSize={0.6}
              />
              <PokerCard
                suit={Suits.Spades}
                value={CardValues.Seven}
                scaleSize={0.6}
              />
              <PokerCard
                suit={Suits.Diamonds}
                value={CardValues.Eight}
                scaleSize={0.6}
              />
            </Stack>
          }
        />
      </Box>
    </Layout>
  );
}

export default PokerRoom;
