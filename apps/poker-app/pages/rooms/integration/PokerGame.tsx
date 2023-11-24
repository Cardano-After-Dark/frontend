import { getCircularProgressUtilityClass } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { Table } from './table';
import { Sim } from './simulation';
import ActionPanel from './components/ActionPanel';
import { GameState, PlayerAgent, PokerPlayer, TableState } from 'zkpoker';
import { promises } from 'dns';

import LoadingOverlay from './components/LoadingOverlay2';


const simulation = new Sim()


const PokerGame: React.FC = () => {


    const initialTableState: TableState = {
        holeCards: [],
        flopCards: [],
        turnCard: undefined,
        riverCard: undefined,
    };


    const [isLoading, setIsLoading] = useState(true);
    const [loadingDescription, setLoadingDescription] = useState("Starting simulation...")

    const [cardProps, setCardProps] = useState<TableState>(initialTableState);
    const [gameProps, setGameProps] = useState<GameState>();

    const handelFold = async () => {
        await simulation.playerFold(simulation.allPlayerAgents[simulation.ownerGameState.currPlayerIndex])

        // await simulation.ownerBet();
        const updatedGameState = { ...simulation.ownerGameState, currPlayerIndex: simulation.ownerGameState.currPlayerIndex } as GameState

        setGameProps(updatedGameState);
    };

    const handleBet = async () => {

        await simulation.playerBet(simulation.allPlayerAgents[simulation.ownerGameState.currPlayerIndex])

        // await simulation.ownerBet();
        const updatedGameState = { ...simulation.ownerGameState, currPlayerIndex: simulation.ownerGameState.currPlayerIndex } as GameState

        setGameProps(updatedGameState);

    };

    useEffect(() => {
        const handleUpdate = async () => {
            switch (simulation.status) {
                case "SETUP_COMPLETE":
                    await simulation.addPlayers();
                    setLoadingDescription(simulation.nextLoadingDescription);
                    setGameProps(simulation.ownerGameState);
                    break;
    
                case "PLAYERS_ADDED":
                    await simulation.setupKeys();
                    setLoadingDescription(simulation.nextLoadingDescription);
                    break;

                case "KEYS_GENERATED":
                    await simulation.setupCards();
                    setLoadingDescription(simulation.nextLoadingDescription);
                    setIsLoading(false);
                    break;
    
                default:
                    break;
            }
        };
    
        handleUpdate();
    }, [simulation.status]);

    useEffect(() => {
        setCardProps(simulation.ownerTableView)
    }, [simulation.ownerTableView]);


    // useEffect(() => {
    //     const handleUpdate = async () => {
    //         switch (simulation.status) {
    //             case "setup":
    //                 const setupUpdatedSimulation = await simulation.addPlayers();
    //                 setSimulation(setupUpdatedSimulation);
    //                 setLoadingDescription(setupUpdatedSimulation.status)
    //                 break;
    
    //             case "playersAdded":
    //                 // const playersAddedUpdatedSimulation = await simulation.setupKeys();
    //                 // setSimulation(playersAddedUpdatedSimulation);
    //                 // setLoadingDescription(simulation.status)
    //                 break;
    
    //             // Add more cases as needed
    //             default:
    //                 break;
    //         }
    //     };
    
    //     handleUpdate();
    // }, [simulation.status]);

    // const updateCardProp = () => {
    //     setCardProps(simRef.current.ownerTableView);
    // }

    // useEffect(() => {

    //     switch (simulation.status) {
    //         case "setupComplete":
    //             simulation.setupCards().then(()=>{
    //                 simulation.runSimulation();
    //             });
    //             break;

    //         case "setupCardsComplete":
    //             simulation.constructHoleCards();
    //             break;

    //         default:
    //             break;
    //     }

    // }, [simulation]);



    // useEffect(() => {

    //     setCardProps(simulation.ownerTableView)

    // }, [simulation.ownerTableView]);


    // useEffect(()=>{
    //     const isEmptyObj = (obj) => {
    //       return Object.keys(obj).length === 0;
    //     };
      
    //     const isEmptyArr = (Arr) => {
    //         return Arr.length === 0;
    //     };

    //     if (simRef.current.ownerGameState) {
    //         setGamePropsLoaded(true)
    //     }
    
    //   })

    //   useEffect(()=>{
    //     console.log(gamePropsLoaded)
    //     setGameProps(simRef.current.ownerGameState)
    //   })

      

    return (
        <>
            <LoadingOverlay isLoading={isLoading} text={loadingDescription}/>
            <Table props={{ 'gameProps': gameProps, 'cardProps': cardProps, 'sim': simulation}} />
            <ActionPanel
                onActionBet={handleBet}
                onActionFold={handelFold} />
        </>
    );
}

export { PokerGame }