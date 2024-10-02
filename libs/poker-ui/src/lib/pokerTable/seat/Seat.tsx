import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { theme } from '../../theme';
import { BetPosition } from '../bet/Bet';

export enum Seats {
  Seat1,
  Seat2,
  Seat3,
  Seat4,
  Seat5,
  Seat6,
}

export type SeatProps = {
  position: Seats;
  children: ReactNode;
};

const defaultSeatStyle = {
  position: 'absolute',
  background: 'rgba(255, 255, 255, 0.2)',
  border: '5px solid rgba(255, 255, 255, 0.05)',
  borderRadius: 3,
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '150px',
};

export const seatPositions = [
  {
    // User position
    player: {
      [theme.breakpoints.down('md')]: {
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '135px',
        height: '60px',
      },
      [theme.breakpoints.up('md')]: {
        bottom: '3%',
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
    bet: BetPosition.Bottom,
  },
  {
    // bottom left corner
    player: {
      [theme.breakpoints.down('md')]: {
        top: '15%',
        right: 0,
        width: '135px',
        height: '60px',
      },
      [theme.breakpoints.up('md')]: {
        top: '65%',
        left: '2%',
        transform: 'translateY(-50%)',
      },
    },
    bet: BetPosition.Right,
  },
  {
    // top left corner
    player: {
      [theme.breakpoints.down('md')]: {
        top: '15%',
        left: 0,
        width: '135px',
        height: '60px',
      },
      [theme.breakpoints.up('md')]: {
        top: '25%',
        left: '2%',
      },
    },
    bet: BetPosition.BottomRight,
  },
  {
    // Player across from user
    player: {
      [theme.breakpoints.down('md')]: {
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '135px',
        height: '60px',
      },
      [theme.breakpoints.up('md')]: {
        top: '3%',
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
    bet: BetPosition.Bottom,
  },

  {
    // top right corner
    player: {
      [theme.breakpoints.down('md')]: {
        top: '30%',
        left: 0,
        width: '135px',
        height: '60px',
      },
      [theme.breakpoints.up('md')]: {
        top: '25%',
        right: '2%',
      },
    },
    bet: BetPosition.BottomLeft,
  },
  {
    // top right side
    player: {
      [theme.breakpoints.down('md')]: {
        top: '65%',
        left: 0,
        width: '135px',
        height: '60px',
      },
      [theme.breakpoints.up('md')]: {
        top: '65%',
        right: '2%',
        transform: 'translateY(-50%)',
      },
    },
    bet: BetPosition.Left,
  },
  {
    // bottom right corner
    player: {
      [theme.breakpoints.down('md')]: {
        top: '65%',
        right: 0,
        width: '135px',
        height: '60px',
      },
      [theme.breakpoints.up('md')]: {
        top: '70%',
        right: 30,
        transform: 'translateY(-50%)',
      },
    },
    bet: BetPosition.Left,
  },
  {
    // top left side
    player: {
      [theme.breakpoints.down('md')]: {
        top: '30%',
        right: 0,
        width: '135px',
        height: '60px',
      },
      [theme.breakpoints.up('md')]: {
        top: '40%',
        left: 30,
        transform: 'translateY(-50%)',
      },
    },
    bet: BetPosition.Right,
  },
];

export function Seat({ position, children }: SeatProps) {
  const seatStyle = {
    ...defaultSeatStyle,
    ...(seatPositions[position]?.player || {}),
  };

  return <Box sx={seatStyle}>{children}</Box>;
}
