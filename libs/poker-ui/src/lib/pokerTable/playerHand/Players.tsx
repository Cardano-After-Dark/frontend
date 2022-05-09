import { Box } from '@mui/system';
import PlayerHand, { Seats } from './PlayerHand';

export type PlayerConfig = {
  cards?: React.ReactNode[];
  currency?: number;
  bet?: number;
  name?: string;
  bank?: number;
};

type PlayersProps = {
  players: PlayerConfig[];
};

export function Players({ players }: PlayersProps) {
  return (
    <Box>
      {players.length >= 1 && (
        <PlayerHand player={players[0]} position={Seats.Seat1} />
      )}
      {players.length >= 2 && (
        <PlayerHand player={players[1]} position={Seats.Seat3} />
      )}
      {players.length >= 3 && (
        <PlayerHand player={players[2]} position={Seats.Seat5} />
      )}
      {players.length >= 4 && (
        <PlayerHand player={players[3]} position={Seats.Seat2} />
      )}
      {players.length >= 5 && (
        <PlayerHand player={players[4]} position={Seats.Seat4} />
      )}
      {players.length >= 6 && (
        <PlayerHand player={players[5]} position={Seats.Seat6} />
      )}
      {players.length >= 7 && (
        <PlayerHand player={players[6]} position={Seats.Seat7} />
      )}
    </Box>
  );
}

export default Players;
