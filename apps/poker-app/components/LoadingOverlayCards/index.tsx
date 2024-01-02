import React from 'react';
import styles from './styles.module.css';
import { PokerCard } from '@after-dark-app/poker-ui';

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  text = 'Shuffling cards...',
}) => {
  
  return (
    <>
      {isLoading && (
        <div className={styles.overlay}>
          <div className={styles.cardLoader}>
            <div className={styles.card}>
              <PokerCard scaleSize={0.4} />
            </div>
            <div className={styles.card}>
              <PokerCard scaleSize={0.45} />
            </div>
            <div className={styles.card}>
              <PokerCard scaleSize={0.4} />
            </div>
          </div>
          <div className={styles.text}>{text}</div>
        </div>
      )}
    </>
  );
};

export default LoadingOverlay;
