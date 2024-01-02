import React from 'react';
import styles from './styles.module.css';

interface LoadingOverlayProps {
  isLoading: boolean;
  text?;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  text = 'Loading...',
}) => {
  
  return (
    <>
      {isLoading && (
        <div className={styles.overlay}>
          <div className={styles.loader}></div>
          <div className={styles.text}>{text}</div>
        </div>
      )}
    </>
  );
};

export default LoadingOverlay;
