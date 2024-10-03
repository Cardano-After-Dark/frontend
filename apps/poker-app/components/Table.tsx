import {
  CardValues,
  Hand,
  Players,
  PokerCard,
  PokerTable,
  River,
  Suits,
  Seat,
  Seats,
  PlayerHand,
} from '@after-dark-app/poker-ui';
import { Box, Stack } from '@mui/material';
import { Chip } from '@mui/material';
import { theme } from '../../../libs/poker-ui/src/lib/theme';
import { useState } from 'react';
import SeatSelector from './SeatSelector';
import { IPlayer } from './PokerGame';
import { PlayerCards, ShowdownCards } from 'zkpoker';

interface TableProps {
  onSeatSelect: (seat: Seats) => void;
  ownerPlayer: { name: string; seat: Seats };
  seatedPlayers: { seatPosition: Seats; player: IPlayer }[];
  playerCards: PlayerCards;
  bettingTurn: IPlayer | null;
  gameWinnerId: string | null;
  showdownCards: ShowdownCards | null;
}

const Table: React.FC<TableProps> = ({
  onSeatSelect,
  ownerPlayer,
  seatedPlayers,
  playerCards,
  bettingTurn,
  gameWinnerId,
  showdownCards,
}) => {
  const [players, setPlayers] = useState<{
    [key in Seats]?: { name: string; bank: number };
  }>({});

  const [seatSelected, setSeatSelected] = useState(false);
  const [currPot, setCurrPot] = useState(0);

  const handleJoinSeat = (position: Seats) => {
    onSeatSelect(position);
    setSeatSelected(true);
  };

  const cardValueMap = {
    A: CardValues.Ace,
    '2': CardValues.Two,
    '3': CardValues.Three,
    '4': CardValues.Four,
    '5': CardValues.Five,
    '6': CardValues.Six,
    '7': CardValues.Seven,
    '8': CardValues.Eight,
    '9': CardValues.Nine,
    '10': CardValues.Ten,
    J: CardValues.Jack,
    Q: CardValues.Queen,
    K: CardValues.King,
  };

  const suitMap = {
    D: Suits.Diamonds,
    C: Suits.Clubs,
    H: Suits.Hearts,
    S: Suits.Spades,
  };

  const ownerHoleCards =
    playerCards.holeCards &&
    playerCards.holeCards.map(function (card, index) {
      return (
        <PokerCard
          key={`hole-${index}`}
          suit={suitMap[card.suit]}
          value={cardValueMap[card.rank]}
          scaleSize={0.7}
          tilt={index === 1}
        />
      );
    });

  console.log(playerCards);

  const othersHoleCards = (playerId: string) => {
    if (showdownCards && showdownCards[playerId]) {
      return showdownCards[playerId].map((card, index) => (
        <PokerCard
          key={`hole-${index}`}
          suit={suitMap[card.suit]}
          value={cardValueMap[card.rank]}
          scaleSize={0.5}
          tilt={index === 1}
        />
      ));
    } else {
      return (
        playerCards.holeCards &&
        playerCards.holeCards.map((card, index) => (
          <PokerCard
            key={`hole-${index}`}
            scaleSize={0.5}
            tilt={index === 1}
            hidden
          />
        ))
      );
    }
  };

  const allHands = Object.entries(seatedPlayers)
    .map(([seatPosition, player]) => {
      if (player !== null) {
        const isOwner = parseInt(seatPosition) - 1 === ownerPlayer.seat;
        return (
          <PlayerHand
            key={seatPosition}
            position={parseInt(seatPosition) - 1}
            player={{
              cards: isOwner ? ownerHoleCards : othersHoleCards(player.id),
              name: player.name,
              bank: player.stack,
              // bet: 0,
              turn: bettingTurn?.id === player.id,
              winner: gameWinnerId === player.id,
            }}
          />
        );
      }
      return null;
    })
    .filter(Boolean);

  const flopCards =
    playerCards.flopCards &&
    playerCards.flopCards.map((card, index) =>
      card ? (
        <PokerCard
          key={`flop-${index}`}
          suit={suitMap[card.suit]}
          value={cardValueMap[card.rank]}
          scaleSize={0.8}
        />
      ) : null
    );

  const turnCard =
    playerCards.turnCard &&
    playerCards.turnCard.map((card, index) =>
      card ? (
        <PokerCard
          key={`turn-${index}`}
          suit={suitMap[card.suit]}
          value={cardValueMap[card.rank]}
          scaleSize={0.8}
        />
      ) : null
    );

  const riverCard =
    playerCards.riverCard &&
    playerCards.riverCard.map((card, index) =>
      card ? (
        <PokerCard
          key={`river-${index}`}
          suit={suitMap[card.suit]}
          value={cardValueMap[card.rank]}
          scaleSize={0.8}
        />
      ) : null
    );

  const communityCards = [
    ...(flopCards || []),
    ...(turnCard || []),
    ...(riverCard || []),
  ];

  // const hand = ownerPlayer ? (
  //   <PlayerHand
  //     position={ownerPlayer.seat}
  //     player={{
  //       cards: [],
  //       name: ownerPlayer.name,
  //       bank: 0,
  //       // bet: 0,
  //       turn: false,
  //     }}
  //   />
  // ) : null;

  return (
    <>
      <PokerTable>
        <River>
          <Stack direction={'row'} spacing={1}>
            {communityCards}
          </Stack>
          {currPot > 0 && (
            <Chip
              sx={{
                position: 'absolute',
                [theme.breakpoints.down('md')]: {
                  bottom: '105%',
                  left: 0,
                  zIndex: 1,
                },
                [theme.breakpoints.up('md')]: {
                  top: 'auto',
                  bottom: '-25%',
                  zIndex: 1,
                  fontSize: 16,
                },
              }}
              color="info"
              label={`Pot: ${currPot}`}
            />
          )}
        </River>
        {allHands}
      </PokerTable>
      {ownerPlayer.seat == null &&
        Object.entries(seatedPlayers)
          .map(([seatNumber, player]) => {
            const seat = parseInt(seatNumber) - 1;
            if (player === null) {
              return (
                <Seat key={seat} position={seat}>
                  <SeatSelector
                    position={seat}
                    player={null}
                    onJoin={handleJoinSeat}
                  />
                </Seat>
              );
            }
            return null;
          })
          .filter(Boolean)}
    </>
  );
};

export default Table;
