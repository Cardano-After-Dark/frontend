import { Layout } from '@after-dark-app/common-ui';
import {
  CardValues,
  Hand,
  Players,
  PokerCard,
  PokerTable,
  River,
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
        <PokerTable>
          <River>
            <Stack direction={'row'} spacing={1}>
              <PokerCard
                suit={Suits.Clubs}
                value={CardValues.Ace}
                scaleSize={0.7}
              />
              <PokerCard
                suit={Suits.Hearts}
                value={CardValues.King}
                scaleSize={0.7}
              />
              <PokerCard
                suit={Suits.Diamonds}
                value={CardValues.Eight}
                scaleSize={0.7}
              />
              <PokerCard
                suit={Suits.Spades}
                value={CardValues.Seven}
                scaleSize={0.7}
              />
              <PokerCard
                suit={Suits.Diamonds}
                value={CardValues.Eight}
                scaleSize={0.7}
              />
            </Stack>
          </River>
          <Hand
            player={{
              name: 'david',
              bank: 320,
              bet: 2300,
              cards: [
                <PokerCard
                  suit={Suits.Clubs}
                  value={CardValues.Ace}
                  scaleSize={0.6}
                  key={18}
                />,
                <PokerCard
                  suit={Suits.Hearts}
                  value={CardValues.King}
                  scaleSize={0.6}
                  key={188}
                  tilt
                />,
              ],
            }}
          />
          <Players
            players={[
              {
                name: 'Henry',
                bank: 890,
                bet: 1300,
                cards: [
                  <PokerCard scaleSize={0.5} key={1} />,
                  <PokerCard scaleSize={0.5} key={11} tilt />,
                ],
              },
              {
                name: 'Henry',
                bank: 890,
                bet: 1300,
                cards: [
                  <PokerCard scaleSize={0.5} key={12} />,
                  <PokerCard scaleSize={0.5} key={122} tilt />,
                ],
              },
              {
                name: 'Henry',
                bank: 890,
                bet: 1300,
                cards: [
                  <PokerCard scaleSize={0.5} key={13} />,
                  <PokerCard scaleSize={0.5} key={133} tilt />,
                ],
              },
              {
                name: 'Henry',
                bank: 890,
                bet: 1300,
                cards: [
                  <PokerCard scaleSize={0.5} key={14} />,
                  <PokerCard scaleSize={0.5} key={144} tilt />,
                ],
              },
              {
                name: 'Henry',
                bank: 890,
                bet: 200,
                cards: [
                  <PokerCard scaleSize={0.5} key={15} />,
                  <PokerCard scaleSize={0.5} key={155} tilt />,
                ],
              },
              {
                name: 'Henry',
                bank: 890,
                bet: 200,
                cards: [
                  <PokerCard scaleSize={0.5} key={16} />,
                  <PokerCard scaleSize={0.5} key={166} tilt />,
                ],
              },
              {
                name: 'Henry',
                bank: 890,
                bet: 200,
                cards: [
                  <PokerCard scaleSize={0.5} key={17} />,
                  <PokerCard scaleSize={0.5} key={177} tilt />,
                ],
              },
            ]}
          />
        </PokerTable>
      </Box>
    </Layout>
  );
}

export default PokerRoom;
