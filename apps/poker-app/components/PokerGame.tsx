import React, { useState, useEffect, useRef, useCallback } from 'react';
import Table from './Table';
import LoadingOverlay from './LoadingOverlayCards';
import { Seats } from '@after-dark-app/poker-ui';
import LoginOverlay from './LoginOverlay';
import { PlayerApp, PlayerCards, Card } from 'zkpoker';
import GameSettingsPanel from './GameSettingsPanel';

// import ZkPokerConnector from './Simulation';

// const zkPokerInstance = new ZkPokerConnector();

interface ISeats {
  [key: number]: IPlayer | null;
}

export interface IPlayer {
  id: string;
  name: string;
  stack: number;
}

const EmptyPlayerCards: PlayerCards = {
  holeCards: [],
  flopCards: [],
  turnCard: [],
  riverCard: [],
};

const PokerGame: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingDescription, setLoadingDescription] = useState(
    'Starting simulation...'
  );
  // Add these state variables
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerSeat, setOwnerSeat] = useState<Seats | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [seatedPlayers, setSeatedPlayers] = useState<ISeats>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  });
  const playerAppRef = useRef<PlayerApp | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerCards, setPlayerCards] = useState<PlayerCards>(EmptyPlayerCards);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const updateSeats = useCallback(() => {
    const seats: ISeats = playerAppRef.current?.getPokerTableSeats() || {};
    setSeatedPlayers((prev) => {
      const updatedPlayers = { ...prev };
      Object.entries(seats).forEach(([seatNumber, player]) => {
        if (player !== null) {
          updatedPlayers[seatNumber] = player;
        } else {
          updatedPlayers[seatNumber] = null;
        }
      });
      console.log('Updated seatedPlayers:', updatedPlayers);
      return updatedPlayers;
    });
  }, []);

  const updateCards = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const cards = await playerAppRef.current?.getPlayerCards();
    console.log('cards', cards);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await playerAppRef.current?.displayGameCards();
  }, []);

  const handleSeatSelect = useCallback(
    (seatPosition: Seats) => {
      setOwnerSeat(seatPosition);
      playerAppRef.current?.joinTable(seatPosition + 1);
      updateSeats();
    },
    [updateSeats]
  );

  // Add this function to handle login
  const handleLogin = useCallback(
    async (name: string) => {
      setOwnerName(name);
      setIsLoggedIn(true);
      const player = {
        id: new Date().getTime().toString(36),
        name: name,
        stack: 1_000,
      };
      const newPlayerApp = new PlayerApp(player);
      await new Promise((resolve) => setTimeout(resolve, 500));
      newPlayerApp.joinPokerRoom();
      playerAppRef.current = newPlayerApp;
      playerAppRef.current.receiveEventEmitter.on(
        'pokerTable.playerJoined',
        () => {
          updateSeats();
        }
      );
      playerAppRef.current.receiveEventEmitter.on(
        'pokerTable.playerLeft',
        () => {
          updateSeats();
        }
      );
      playerAppRef.current.internalEventEmitter.on(
        'updater.cards',
        (playerCards: PlayerCards) => {
          setPlayerCards(playerCards);
          console.log('playerCards', playerCards);
        }
      );
    },
    [updateSeats, updateCards]
  );

  // // Example function to interact with playerApp later
  // const handleSomeGameAction = () => {
  //   if (playerAppRef.current) {
  //     playerAppRef.current.someGameMethod();
  //   }
  // };

  const ownerPlayer = {
    name: ownerName,
    seat: ownerSeat,
  };

  const handleLeaveTable = useCallback(() => {
    if (ownerSeat !== null) {
      setOwnerSeat(null);
      playerAppRef.current?.leaveTable();
      updateSeats();
    }
  }, [ownerSeat, updateSeats]);

  const handleStartGame = useCallback(() => {
    // Implement game start logic here
    console.log('Starting the game...');
    setGameStarted(true);
    // You might want to call a method on playerAppRef.current to start the game
    const initGame = async () => {
      await playerAppRef.current?.setupPokerTable();
      await playerAppRef.current?.setupGame();
    };
    initGame();
    // playerAppRef.current?.startGame();
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <LoginOverlay onLogin={handleLogin} />
      ) : (
        <>
          <LoadingOverlay isLoading={isLoading} text={loadingDescription} />
          <GameSettingsPanel
            onLeaveTable={handleLeaveTable}
            onStartGame={handleStartGame}
            isSeated={ownerSeat !== null}
            canStartGame={
              !gameStarted &&
              Object.values(seatedPlayers).filter(Boolean).length > 1
            }
          />
          <Table
            onSeatSelect={handleSeatSelect}
            ownerPlayer={ownerPlayer}
            seatedPlayers={seatedPlayers}
            playerCards={playerCards}
          />
        </>
      )}
    </>
  );
};

export { PokerGame };
