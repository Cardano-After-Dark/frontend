import { styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Hand } from './hand/Hand';
import { PlayerHand, Seats } from './playerHand/PlayerHand';
import River from './river/River';

export type Player = {
  cards?: React.ReactNode[];
  currency?: number;
  bet?: number;
  name?: string;
  bank?: number;
};

type PokerTableProps = {
  river: React.ReactChild;
  hand: Player;
  players: Player[];
};

export const PokerTableContainer = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #4aad4a;
  border-radius: 150px;
  border: 15px solid #a95555;
  &:before {
    content: '';
    border: 7px solid rgba(0, 0, 0, 0.1);
    display: block;
    border-radius: 150px;
    position: absolute;
    top: -15px;
    left: -15px;
    bottom: -15px;
    right: -15px;
  }
  &:after {
    content: '';
    border: 7px solid rgba(0, 0, 0, 0.1);
    display: block;
    border-radius: 130px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

export function PokerTable({ river, hand, players }: PokerTableProps) {
  return (
    <PokerTableContainer>
      <River>{river}</River>
      <Hand player={hand} />
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
    </PokerTableContainer>
  );
}

export default PokerTable;
