import React, { useState } from 'react';
import ActionButton from '../ActionButton';
import ActionSlider from '../ActionSlider';
import styles from './styles.module.css';

interface ActionPanelProps {
  onActionBet: (betAmount) => Promise<void>;
  onActionFold: () => Promise<void>;
  bigBlind: number;
  currHiBet: number;
  playerCurrBet: number;
  playerStack: number;
}

const ActionPanel: React.FC<ActionPanelProps> = ({
  onActionBet,
  onActionFold,
  bigBlind,
  currHiBet,
  playerCurrBet,
  playerStack,
}) => {
  const [betSliderValue, setBetSliderValue] = useState(bigBlind + currHiBet);

  const handleBetSliderChange = (value: number) => {
    setBetSliderValue(value);
  };

  return (
    <div className={styles.actionPanelContainer}>
      <div className={styles.actionButtonContainer}>
        <div className={styles.actionButtonWrapper}>
          {currHiBet === 0 ? (
            <ActionButton
              onClick={() => onActionBet(0)}
              text="Check"
              buttonType="bet"
            />
          ) : (
            <ActionButton
              onClick={
                playerStack > currHiBet
                  ? () => onActionBet(currHiBet)
                  : () => onActionBet(playerStack + playerCurrBet)
              }
              text="Call"
              subText={`${
                playerStack > currHiBet
                  ? currHiBet
                  : playerStack + playerCurrBet
              }`}
              buttonType="bet"
            />
          )}
        </div>
        <div className={styles.actionButtonWrapper}>
          <ActionButton
            onClick={
              playerStack > currHiBet
                ? () => onActionBet(betSliderValue)
                : () => onActionBet(playerStack + playerCurrBet)
            }
            text={currHiBet === 0 ? 'Bet' : 'Raise'}
            subText={`${betSliderValue}`}
            buttonType="bet"
            disabled={playerStack < betSliderValue - playerCurrBet}
          />
        </div>
        <div className={styles.actionButtonWrapper}>
          <ActionButton onClick={onActionFold} text="Fold" buttonType="fold" />
        </div>
      </div>

      <div className={styles.actionSliderWrapper}>
        <ActionSlider
          value={betSliderValue}
          onChange={handleBetSliderChange}
          min={bigBlind + currHiBet}
          max={playerStack + playerCurrBet}
          step={bigBlind}
        />
      </div>
    </div>
  );
};

export default ActionPanel;
