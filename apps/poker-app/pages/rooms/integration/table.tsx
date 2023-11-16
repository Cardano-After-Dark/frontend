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

export const Table = (props) => {

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
            <Hand
                player={{
                    name: 'alice',
                    bank: 320,
                    bet: 2300,
                    cards: renderHoleCards
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
                        name: 'Henry2',
                        bank: 890,
                        bet: 1300,
                        cards: [
                            <PokerCard scaleSize={0.5} key={12} />,
                            <PokerCard scaleSize={0.5} key={122} tilt />,
                        ],
                    },
                    //   {
                    //     name: 'Henry',
                    //     bank: 890,
                    //     bet: 1300,
                    //     cards: [
                    //       <PokerCard scaleSize={0.5} key={13} />,
                    //       <PokerCard scaleSize={0.5} key={133} tilt />,
                    //     ],
                    //   },
                    //   {
                    //     name: 'Henry',
                    //     bank: 890,
                    //     bet: 1300,
                    //     cards: [
                    //       <PokerCard scaleSize={0.5} key={14} />,
                    //       <PokerCard scaleSize={0.5} key={144} tilt />,
                    //     ],
                    //   },
                    //   {
                    //     name: 'Henry',
                    //     bank: 890,
                    //     bet: 200,
                    //     cards: [
                    //       <PokerCard scaleSize={0.5} key={15} />,
                    //       <PokerCard scaleSize={0.5} key={155} tilt />,
                    //     ],
                    //   },
                    //   {
                    //     name: 'Henry',
                    //     bank: 890,
                    //     bet: 200,
                    //     cards: [
                    //       <PokerCard scaleSize={0.5} key={16} />,
                    //       <PokerCard scaleSize={0.5} key={166} tilt />,
                    //     ],
                    //   },
                    //   {
                    //     name: 'Henry',
                    //     bank: 890,
                    //     bet: 200,
                    //     cards: [
                    //       <PokerCard scaleSize={0.5} key={17} />,
                    //       <PokerCard scaleSize={0.5} key={177} tilt />,
                    //     ],
                    //   },
                ]}
            />
        </PokerTable>
    );


}