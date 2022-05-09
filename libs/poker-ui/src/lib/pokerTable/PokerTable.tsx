import { styled } from '@mui/material';
import React, { ReactNode } from 'react';

export type Player = {
  cards?: React.ReactNode[];
  currency?: number;
  bet?: number;
  name?: string;
  bank?: number;
};

type PokerTableProps = {
  children: ReactNode;
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

export function PokerTable({ children }: PokerTableProps) {
  return <PokerTableContainer>{children}</PokerTableContainer>;
}

export default PokerTable;
