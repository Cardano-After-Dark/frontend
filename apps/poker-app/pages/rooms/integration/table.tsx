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

export const Table = (props) => {

    const ownerPlayer: PlayerState = props.props.gameProps?.players.find((_, index) => index == props.props.gameProps?.thisPlayerIndex)

    const otherPlayers: PlayerState [] = props.props.gameProps?.players.filter((_, index) => index != props.props.gameProps?.thisPlayerIndex)

    const ownerTurn: boolean = props.props.gameProps?.currPlayerIndex == props.props.gameProps?.thisPlayerIndex

    const playerTurnByPubKey: string = props.props.gameProps?.players[props.props.gameProps?.currPlayerIndex].playerPubKey;

    const cardValueMap = {
        "A": CardValues.Ace,
        "2": CardValues.Two,
        "3": CardValues.Three,
        "4": CardValues.Four,
        "5": CardValues.Five,
        "6": CardValues.Six,
        "7": CardValues.Seven,
        "8": CardValues.Eight,
        "9": CardValues.Nine,
        "10": CardValues.Ten,
        "J": CardValues.Jack,
        "Q": CardValues.Queen,
        "K": CardValues.King,
    }

    const suitMap = {
        "♦": Suits.Diamonds,
        "♣": Suits.Clubs,
        "♥": Suits.Hearts,
        "♠": Suits.Spades
    }

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


    const flopCards = props.props.cardProps.flopCards && props.props.cardProps.flopCards.map(function (item, index) {

        const card = getSuitAndValue(item);

        return (
            <PokerCard
                key={`flop-${index}`}
                suit={suitMap[card.suit]}
                value={cardValueMap[card.value]}
                scaleSize={0.7}
            />
        )
    })

    const turnCard = getSuitAndValue(props.props.cardProps.turnCard)

    // Check if turnCard is defined and render the PokerCard component
    const renderTurnCard = turnCard ? (
        <PokerCard
            key={`turn-card`}
            suit={suitMap[turnCard.suit]}
            value={cardValueMap[turnCard.value]}
            scaleSize={0.7}
        />
    ) : null;


    const riverCard = getSuitAndValue(props.props.cardProps.riverCard)

    // Check if riverCard is defined and render the PokerCard component
    const renderRiverCard = riverCard ? (
        <PokerCard
            key={`river-card`}
            suit={suitMap[riverCard.suit]}
            value={cardValueMap[riverCard.value]}
            scaleSize={0.7}
        />
    ) : null;

    const renderHoleCards = props.props.cardProps.holeCards && props.props.cardProps.holeCards.map(function (item, index) {

        const card = getSuitAndValue(item);

        return (
            <PokerCard
                key={`hole-${index}`}
                suit={suitMap[card.suit]}
                value={cardValueMap[card.value]}
                scaleSize={0.7}
                tilt={index === 1}
            />
        )
    })

    const ownerHand = ownerPlayer ? (
        <Hand
            player={{
                name: ownerPlayer.playerName,
                bank: ownerPlayer.playerGameStack,
                bet: ownerPlayer.playerRounds[props.props.gameProps.currRoundIndex].playerRoundCurBet == 0 ? null : ownerPlayer.playerRounds[props.props.gameProps.currRoundIndex].playerRoundCurBet,
                // bet: 1,
                cards: renderHoleCards,
                turn: !(Array.isArray(renderHoleCards) && renderHoleCards.length === 0) && ownerTurn
            }}
        />
    ) : null;

    const otherPlayerHands = otherPlayers ? (
        <Players
                players={otherPlayers.map(function (player, index) {

                    const thisPlayerTurn: boolean = player.playerPubKey == playerTurnByPubKey;
                    
                    return {
                        name: player.playerName,
                        bank: player.playerGameStack,
                        bet: player.playerRounds[props.props.gameProps.currRoundIndex].playerRoundCurBet == 0 ? null : player.playerRounds[props.props.gameProps.currRoundIndex].playerRoundCurBet,
                        // bet: 1,
                        cards: (Array.isArray(renderHoleCards) && renderHoleCards.length === 0) || !player.playerHandActive? [] : [
                            <PokerCard scaleSize={0.5} key={`${index}-1`} />,
                            <PokerCard scaleSize={0.5} key={`${index}-2`} tilt />, 
                        ],
                        turn: thisPlayerTurn
                    }
                })}
            />
    ) : null

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
            </River>
            {ownerHand}
            {otherPlayerHands}
        </PokerTable>
    );


}