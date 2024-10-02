import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

enum Seats {
  Seat1,
  Seat2,
  Seat3,
  Seat4,
  Seat5,
  Seat6,
}

interface SeatContentProps {
  position: Seats;
  player?: { name: string; bank: number };
  onJoin: (position: Seats) => void;
}

const SeatSelector: React.FC<SeatContentProps> = ({
  position,
  player,
  onJoin,
}) => {
  //   const [playerName, setPlayerName] = useState('');

  const handleJoin = () => {
    // if (playerName.trim()) {
    onJoin(position);
    //   setPlayerName('');
    // }
  };

  if (player) {
    return (
      <>
        <Typography variant="h6">{player.name}</Typography>
        <Typography variant="subtitle1">Bank: ${player.bank}</Typography>
      </>
    );
  } else {
    return (
      <>
        <Typography variant="h6" gutterBottom>
          Seat {position + 1}
        </Typography>
        {/* <TextField
          label="Your Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          size="small"
          sx={{ mb: 1 }}
        /> */}
        <Button
          variant="contained"
          onClick={handleJoin}
          //   disabled={!playerName.trim()}
        >
          Join Seat
        </Button>
      </>
    );
  }
};

export default SeatSelector;
