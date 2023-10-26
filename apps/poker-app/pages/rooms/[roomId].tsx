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
import { useEffect, useState } from 'react';
import { PokerPlayer, GENERATED_KEYS, PlayerAgent } from 'zkpoker';

export class Sim{

  player0: PokerPlayer;
  player1: PokerPlayer;
  player2: PokerPlayer;


  async simulate(){
  
    //   // First, we instantiate the players
    this.player0 = new PokerPlayer({ name: "astrid", stake: 1_000_000_000 }, GENERATED_KEYS);
    this.player1 = new PokerPlayer({ name: "bette", stake: 1_000_000_000 }, GENERATED_KEYS);
    this.player2 = new PokerPlayer({ name: "carla", stake: 1_000_000_000 }, GENERATED_KEYS);
    
    // log(`\n=== Test Simulation Start ===\n`);
    // log(` >>> ${player0.name} ${player2.name} ${player2.name} `)
    
    const publicInfo0 = await this.player0.getPublicInfo();
    const publicInfo1 = await this.player1.getPublicInfo();
    const publicInfo2 = await this.player2.getPublicInfo();
    const allPublicInfo = [publicInfo0, publicInfo1, publicInfo2];

        // // Each Agent initialized per Player, with reference to all participants, by publicInfo
        // let pa0 = new PlayerAgent(player0, allPublicInfo);
        // let pa1 = new PlayerAgent(player1, allPublicInfo);
        // let pa2 = new PlayerAgent(player2, allPublicInfo);
  }

}


export function PokerRoom() {
  const router = useRouter();

  const sim: Sim = new Sim();
  sim.simulate();

  // const [pokerState, updatePokerState] = useState<PokerState>(null)
  //   useEffect(async () => {
  //   // ...simulate function...
  //   // on state change: updatePokerState
  // });


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
              name: sim.player0.name,
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
