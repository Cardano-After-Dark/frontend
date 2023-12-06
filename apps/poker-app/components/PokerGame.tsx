import React, { useState, useEffect } from 'react';
import Table from './Table';
import Sim from './Simulation';
import ActionPanel from './ActionPanel';
import { GameState, TableState } from 'zkpoker';
import LoadingOverlay from './LoadingOverlayCards';

const simulation = new Sim();

const PokerGame: React.FC = () => {
  const initialTableState: TableState = {
    holeCards: [],
    flopCards: [],
    turnCard: undefined,
    riverCard: undefined,
  };

  const [isLoading, setIsLoading] = useState(true);
  const [loadingDescription, setLoadingDescription] = useState(
    'Starting simulation...'
  );

  const [cardProps, setCardProps] = useState<TableState>(initialTableState);
  const [gameProps, setGameProps] = useState<GameState>();

  const [handActive, setHandActive] = useState(true);

  const handelFold = async () => {
    await simulation.playerFold(
      simulation.allPlayerAgents[simulation.ownerGameState.currPlayerIndex]
    );

    const updatedGameState = {
      ...simulation.ownerGameState,
      currPlayerIndex: simulation.ownerGameState.currPlayerIndex,
    } as GameState;

    setGameProps(updatedGameState);
  };

  const handleBet = async () => {
    await simulation.playerBet(
      simulation.allPlayerAgents[simulation.ownerGameState.currPlayerIndex]
    );

    const updatedGameState = {
      ...simulation.ownerGameState,
      currPlayerIndex: simulation.ownerGameState.currPlayerIndex,
      currRoundIndex: simulation.ownerGameState.currRoundIndex,
    } as GameState;

    setGameProps(updatedGameState);
  };

  useEffect(() => {
    const handleUpdate = async () => {
      switch (simulation.status) {
        case 'SETUP_COMPLETE': {
          await simulation.addPlayers();
          setLoadingDescription(simulation.nextLoadingDescription);
          setGameProps(simulation.ownerGameState);
          break;
        }
        case 'PLAYERS_ADDED': {
          await simulation.setupKeys();
          setLoadingDescription(simulation.nextLoadingDescription);
          break;
        }
        case 'KEYS_GENERATED': {
          await simulation.setupCards();
          setLoadingDescription(simulation.nextLoadingDescription);
          setIsLoading(false);
          break;
        }
        default: {
          break;
        }
      }
    };

    handleUpdate();
  }, [simulation.status]);

  useEffect(() => {
    setCardProps(simulation.ownerTableView);
  }, [simulation.ownerTableView]);

  useEffect(() => {
    const handleRoundUpdate = async () => {
      switch (simulation.ownerGameState?.currRoundIndex) {
        case 1: {
          await simulation.constructFlopCards();
          const flopTableView = {
            ...simulation.ownerTableView,
            flopCards: simulation.ownerTableView.flopCards,
          } as TableState;
          setCardProps(flopTableView);
          break;
        }
        case 2: {
          await simulation.constructTurnCard();
          const turnTableView = {
            ...simulation.ownerTableView,
            turnCard: simulation.ownerTableView.turnCard,
          } as TableState;
          setCardProps(turnTableView);
          break;
        }
        case 3: {
          await simulation.constructRiverCard();
          const riverTableView = {
            ...simulation.ownerTableView,
            riverCard: simulation.ownerTableView.riverCard,
          } as TableState;
          setCardProps(riverTableView);
          break;
        }
        case 4: {
          setHandActive(false);
          break;
        }
        default: {
          break;
        }
      }
    };

    handleRoundUpdate();
  }, [simulation.ownerGameState?.currRoundIndex]);

  return (
    <>
      <LoadingOverlay isLoading={isLoading} text={loadingDescription} />
      <Table game={gameProps} cards={cardProps} />
      {handActive && !isLoading && (
        <ActionPanel
          onActionBet={handleBet}
          onActionFold={handelFold}
          bigBlind={20}
          playerStack={1000}
        />
      )}
    </>
  );
};

export { PokerGame };
