import { styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type Player = {
  numberOfCards: number;
  cards?: React.ReactChild;
  fliped?: boolean;
};

type TableProps = {
  river: React.ReactChild;
  players: Player[];
};

export const TableContainer = styled('div')`
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

export function Table({ river, players }: TableProps) {
  return (
    <TableContainer>
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
        }}
      >
        {river}
      </Box>
    </TableContainer>
  );
}

export default Table;
