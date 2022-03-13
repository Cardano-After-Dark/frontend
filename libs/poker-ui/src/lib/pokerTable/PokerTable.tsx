import { styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type Player = {
  numberOfCards: number;
  cards?: React.ReactChild;
  fliped?: boolean;
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
      <Box
        sx={{
          border: `3px solid rgba(255, 255, 255, 0.2)`,
          width: 300,
          height: 100,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {river}
      </Box>
      <Box
        sx={{
          border: `3px solid rgba(255, 255, 255, 0.2)`,
          borderRadius: 3,
          width: 200,
          height: 100,
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {hand.cards && hand.cards}
      </Box>
      {players.length >= 1 && (
        <Box
          sx={{
            width: 200,
            height: 100,
            position: 'absolute',
            top: 30,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          Player 1
        </Box>
      )}
      {players.length >= 2 && (
        <Box
          sx={{
            width: 200,
            height: 100,
            position: 'absolute',
            top: '50%',
            left: 30,
            transform: 'translateY(-50%)',
          }}
        >
          Player 2
        </Box>
      )}
      {players.length >= 3 && (
        <Box
          sx={{
            width: 200,
            height: 100,
            position: 'absolute',
            top: '50%',
            right: 30,
            transform: 'translateY(-50%)',
          }}
        >
          Player 3
        </Box>
      )}
    </PokerTableContainer>
  );
}

export default PokerTable;
