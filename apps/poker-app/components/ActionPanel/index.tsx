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
  const [betSliderValue, setBetSliderValue] = useState<number>(
    bigBlind + currHiBet
  );

  const handleBetSliderChange = (value: number) => {
    setBetSliderValue(value);
  };

  return (
    <div className={styles.actionPanelContainer}>
      <div className={styles.actionButtonContainer}>
        <>
          {currHiBet == 0 ? (
            <div className={styles.actionButtonWrapper}>
              <ActionButton
                onClick={() => onActionBet(0)}
                text="Check"
                buttonType="betButton"
              />
            </div>
          ) : (
            <div className={styles.actionButtonWrapper}>
              <ActionButton
                onClick={
                  playerStack > currHiBet
                    ? () => onActionBet(currHiBet)
                    : () => onActionBet(playerStack + playerCurrBet)
                }
                text={
                  playerStack > currHiBet
                    ? `Call ${currHiBet}`
                    : `All-In ${playerStack + playerCurrBet}`
                }
                buttonType="betButton"
              />
            </div>
          )}
        </>

        <>
          {playerStack >= betSliderValue - playerCurrBet && (
            <div className={styles.actionButtonWrapper}>
              <ActionButton
                onClick={
                  playerStack > currHiBet
                    ? () => onActionBet(betSliderValue)
                    : () => onActionBet(playerStack + playerCurrBet)
                }
                text={
                  playerStack == betSliderValue
                    ? `All-In ${betSliderValue + playerCurrBet}`
                    : currHiBet == 0
                    ? `Bet ${betSliderValue}`
                    : `Raise ${betSliderValue}`
                }
                buttonType="betButton"
              />
            </div>
          )}
        </>

        <div className={styles.actionButtonWrapper}>
          <ActionButton
            onClick={onActionFold}
            text="Fold"
            buttonType="foldButton"
          />
        </div>
      </div>

      {playerStack >= betSliderValue - playerCurrBet && (
        <div className={styles.actionSliderWrapper}>
          <ActionSlider
            value={betSliderValue}
            onChange={handleBetSliderChange}
            min={bigBlind + currHiBet}
            max={playerStack + playerCurrBet}
            step={bigBlind}
          />
        </div>
      )}

      {/* <div className={styles.actionButtonWrapper}>
        <ActionButton onClick={handleBetValue} text="Bet" buttonType="betButton" />
      </div> */}
    </div>
  );
};

export default ActionPanel;
