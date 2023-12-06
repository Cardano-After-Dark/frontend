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

import { PlayerState } from 'zkpoker';
import { Chip } from '@mui/material';
import { theme } from '../../../libs/poker-ui/src/lib/theme';
import { GameState, TableState } from 'zkpoker';


interface TableProps {
  game: GameState;
  cards: TableState;
}

const Table: React.FC<TableProps> = ({ game, cards }) => {
  const ownerPlayer: PlayerState = game?.players.find(
    (_, index) => index == game?.thisPlayerIndex
  );

  const otherPlayers: PlayerState[] = game?.players.filter(
    (_, index) => index != game?.thisPlayerIndex
  );

  const ownerTurn: boolean =
    game?.currPlayerIndex ==
    game?.thisPlayerIndex;

  const playerTurnByPubKey: string =
    game?.players[game?.currPlayerIndex]
      .playerPubKey;

  const handActive: boolean = game?.currRoundIndex < 4;

  const potEmpty: boolean = game?.currHand.pokerHandPot == 0;

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
    '♦': Suits.Diamonds,
    '♣': Suits.Clubs,
    '♥': Suits.Hearts,
    '♠': Suits.Spades,
  };

  const getSuitAndValue = (cardData) => {
    // Perform your manipulations here
    // For example, extracting suit and value from a string
    if (cardData) {
      let arr = cardData.split('');
      const suit = arr.pop();
      const value = arr.join('');

      // Return the manipulated data
      return {
        suit,
        value,
      };
    }

    // Return null if no data is provided
    return null;
  };

  const flopCards =
    cards.flopCards &&
    cards.flopCards.map(function (item, index) {
      const card = getSuitAndValue(item);

      return (
        <PokerCard
          key={`flop-${index}`}
          suit={suitMap[card.suit]}
          value={cardValueMap[card.value]}
          scaleSize={0.7}
        />
      );
    });

  const turnCard = getSuitAndValue(cards.turnCard);

  // Check if turnCard is defined and render the PokerCard component
  const renderTurnCard = turnCard ? (
    <PokerCard
      key={`turn-card`}
      suit={suitMap[turnCard.suit]}
      value={cardValueMap[turnCard.value]}
      scaleSize={0.7}
    />
  ) : null;

  const riverCard = getSuitAndValue(cards.riverCard);

  // Check if riverCard is defined and render the PokerCard component
  const renderRiverCard = riverCard ? (
    <PokerCard
      key={`river-card`}
      suit={suitMap[riverCard.suit]}
      value={cardValueMap[riverCard.value]}
      scaleSize={0.7}
    />
  ) : null;

  const renderHoleCards =
    cards.holeCards &&
    cards.holeCards.map(function (item, index) {
      const card = getSuitAndValue(item);

      return (
        <PokerCard
          key={`hole-${index}`}
          suit={suitMap[card.suit]}
          value={cardValueMap[card.value]}
          scaleSize={0.7}
          tilt={index === 1}
        />
      );
    });

  const ownerHand = ownerPlayer ? (
    <Hand
      player={{
        name: ownerPlayer.playerName,
        bank: ownerPlayer.playerGameStack,
        bet:
          ownerPlayer.playerRounds[game.currRoundIndex]
            .playerRoundCurBet == 0
            ? null
            : ownerPlayer.playerRounds[game.currRoundIndex]
                .playerRoundCurBet,
        // bet: 1,
        cards: renderHoleCards,
        turn:
          !(Array.isArray(renderHoleCards) && renderHoleCards.length === 0) &&
          ownerTurn &&
          handActive,
      }}
    />
  ) : null;

  const otherPlayerHands = otherPlayers ? (
    <Players
      players={otherPlayers.map(function (player, index) {
        const thisPlayerTurn: boolean =
          player.playerPubKey == playerTurnByPubKey &&
          game.currRoundIndex <= 4;

        return {
          name: player.playerName,
          bank: player.playerGameStack,
          bet:
            player.playerRounds[game.currRoundIndex]
              .playerRoundCurBet == 0
              ? null
              : player.playerRounds[game.currRoundIndex]
                  .playerRoundCurBet,
          // bet: 1,
          cards:
            (Array.isArray(renderHoleCards) && renderHoleCards.length === 0) ||
            !player.playerHandActive
              ? []
              : [
                  <PokerCard scaleSize={0.5} key={`${index}-1`} />,
                  <PokerCard scaleSize={0.5} key={`${index}-2`} tilt />,
                ],
          turn: thisPlayerTurn && handActive,
        };
      })}
    />
  ) : null;

  const communityCards = [
    ...(flopCards ? [...flopCards] : []),
    ...(renderTurnCard ? [renderTurnCard] : []),
    ...(renderRiverCard ? [renderRiverCard] : []),
  ];

  return (
    <PokerTable>
      <River>
        <Stack direction={'row'} spacing={1}>
          {communityCards}
        </Stack>
        {!potEmpty && (
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
            label={`Pot: ${game?.currHand.pokerHandPot}`}
          />
        )}
      </River>
      {ownerHand}
      {otherPlayerHands}
    </PokerTable>
  );
};

export default Table;