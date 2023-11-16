import { getCircularProgressUtilityClass } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { Table } from './table';
import { Sim } from './simulation';
// import { ActionButton } from './interactions/ActionButton'
import ActionPanel from './components/ActionPanel';
import { TableState } from 'zkpoker';


const PokerGame = () => {

    const [simulationLoaded, setSimulationLoaded] = useState(true)

    const simRef = useRef(new Sim());

    const handleBet = () => {
        simRef.current.ownerAgentBet().then(() => {
            updateCardProp()
        });
    };

    const handelFold = () => {
        simRef.current.ownerAgentFold().then(() => {
            updateCardProp();
        });
    };

    const updateCardProp = () => {
        setCardProps(simRef.current.ownerTableView);
    }

    useEffect(() => {

        switch (simRef.current.status) {
            case "setupComplete":
                simRef.current.setupCards();
                break;

            case "setupCardsComplete":
                simRef.current.constructHoleCards().then(() => {
                    updateCardProp();
                });
                break;

            default:
                break;
        }

    }, [simRef.current.status]);


    const [gameProps, setGameProps] = useState({
        default: "defaultGameProps"
    })

    const initialTableState: TableState = {
        holeCards: [],
        flopCards: [],
        turnCard: undefined,
        riverCard: undefined,
    };

    const [cardProps, setCardProps] = useState<TableState>(initialTableState);

    // NOT WORKING FOR SOME REASON!!!
    useEffect(() => {
        setCardProps(simRef.current.ownerTableView);
    }, [simRef.current.ownerTableView])




    return (
        // <TableContext>

        <>
            {simulationLoaded && <Table props={{ 'gameProps': gameProps, 'cardProps': cardProps, 'simulation': simRef }} />}
            <ActionPanel
                onActionBet={handleBet}
                onActionFold={handelFold} />
        </>
        // </TableContext>
    );
}

export { PokerGame }