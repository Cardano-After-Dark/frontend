import { styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Hand } from './hand/Hand';
import { Player, Seats } from './player/Player';
import River from './river/River';

export type Player = {
  cards?: React.ReactChild;
  currency?: number;
  bet?: number;
  profile?: any;
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
      <Hand cards={hand.cards} />
      {players.length >= 1 && (
        <Player
          cards={players[0].cards && players[0].cards}
          position={Seats.Seat1}
        />
      )}
      {players.length >= 2 && (
        <Player
          cards={players[1].cards && players[1].cards}
          position={Seats.Seat3}
        />
      )}
      {players.length >= 3 && (
        <Player
          cards={players[2].cards && players[2].cards}
          position={Seats.Seat5}
        />
      )}
    </PokerTableContainer>
  );
}

export default PokerTable;
