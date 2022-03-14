import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Clubs, Diamonds, Hearts, Icon, Spades } from '@after-dark-app/images';
import { Box } from '@mui/system';

export enum Suits {
  Hearts,
  Spades,
  Diamonds,
  Clubs,
}

export enum CardValues {
  Ace = 'A',
  One = 1,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack = 'J',
  Queen = 'Q',
  King = 'K',
}

export type CardProps = {
  suit?: Suits;
  value?: CardValues;
  scaleSize?: number;
  hidden?: boolean;
  tilt?: boolean;
};

export function PokerCard({
  suit,
  value,
  scaleSize = 1,
  hidden = false,
  tilt = false,
}: CardProps) {
  const [suitImage, setSuitImage] = useState<string>();
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    if (hidden || suit === undefined || value === undefined) {
      setShowBack(true);
      return;
    }

    switch (suit) {
      case Suits.Hearts:
        setSuitImage(Hearts);
        return;
      case Suits.Clubs:
        setSuitImage(Clubs);
        return;
      case Suits.Diamonds:
        setSuitImage(Diamonds);
        return;
      case Suits.Spades:
        setSuitImage(Spades);
        return;
      default:
        setSuitImage(Icon);
        return;
    }
  }, [hidden, suit, value]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: {
          xs: scaleSize * 70,
          sm: scaleSize * 85,
          md: scaleSize * 100,
        },
        height: {
          xs: scaleSize * 1.4 * 70,
          sm: scaleSize * 1.4 * 85,
          md: scaleSize * 1.4 * 100,
        },
        position: 'relative',
        color:
          suit === Suits.Diamonds || suit === Suits.Hearts
            ? '#dd2f45'
            : '#292f33',
        transform: tilt ? 'rotate(20deg)' : '',
      }}
    >
      {suitImage && !showBack && (
        <Box
          sx={{
            width: scaleSize * 30,
            height: scaleSize * 30,
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {suitImage && (
            <Image src={suitImage} layout="fill" objectFit="contain" />
          )}
        </Box>
      )}
      {showBack && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <Image src={Icon} layout="fill" objectFit="contain" />
        </Box>
      )}
      {!hidden && (
        <Box
          sx={{
            position: 'absolute',
            top: scaleSize * 2,
            left: scaleSize * 10,
            fontWeight: 900,
            fontSize: scaleSize * 1.3 + 'rem',
          }}
        >
          {value}
        </Box>
      )}
      {!hidden && (
        <Box
          sx={{
            position: 'absolute',
            bottom: scaleSize * 2,
            right: scaleSize * 10,
            fontWeight: 900,
            fontSize: scaleSize * 1.3 + 'rem',
          }}
        >
          {value}
        </Box>
      )}
    </Paper>
  );
}

export default PokerCard;
