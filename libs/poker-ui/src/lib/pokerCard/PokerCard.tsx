import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Clubs, Diamonds, Hearts, Spades } from '@after-dark-app/images';

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
  suit: Suits;
  value: CardValues;
  scaleSize?: number;
};

export function PokerCard({ suit, value, scaleSize = 1 }: CardProps) {
  const [suitImage, setSuitImage] = useState<any>();

  useEffect(() => {
    switch (suit) {
      case Suits.Clubs:
        setSuitImage(Clubs);
        return;
      case Suits.Diamonds:
        setSuitImage(Diamonds);
        return;
      case Suits.Hearts:
        setSuitImage(Hearts);
        return;
      default:
        setSuitImage(Spades);
        return;
    }
  }, [suit]);

  return (
    <Paper
      sx={{
        width: scaleSize * 100,
        height: scaleSize * 140,
      }}
    >
      <Image src={Clubs} layout="fill" />
    </Paper>
  );
}

export default PokerCard;
