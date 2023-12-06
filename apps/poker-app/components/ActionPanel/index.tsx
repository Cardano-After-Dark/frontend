import React, { useState } from 'react';
import ActionButton from '../ActionButton';
import ActionSlider from '../ActionSlider';
import styles from './styles.module.css';

interface ActionPanelProps {
  onActionBet: () => Promise<void>;
  onActionFold: () => Promise<void>;
  bigBlind: number;
  playerStack: number;
}

const ActionPanel: React.FC<ActionPanelProps> = ({
  onActionBet,
  onActionFold,
  bigBlind,
  playerStack,
}) => {
    
  const [sliderValue, setSliderValue] = useState<number>(bigBlind);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  return (
    <div className={styles.actionPanelContainer}>
      <div className={styles.actionSliderWrapper}>
        <ActionSlider
          value={sliderValue}
          onChange={handleSliderChange}
          min={bigBlind}
          max={playerStack}
          step={bigBlind}
        />
      </div>
      <div className={styles.actionButtonWrapper}>
        <ActionButton onClick={onActionBet} text="Bet" buttonType="betButton" />
      </div>
      <div className={styles.actionButtonWrapper}>
        <ActionButton
          onClick={onActionFold}
          text="Fold"
          buttonType="foldButton"
        />
      </div>
    </div>
  );
};

export default ActionPanel;
