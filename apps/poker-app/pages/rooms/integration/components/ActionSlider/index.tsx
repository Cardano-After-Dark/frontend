import React from 'react';
import styles from './styles.module.css';

interface ActionSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

const ActionSlider: React.FC<ActionSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step,
}) => {
  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  return (
    <>
      <div className={styles.sliderValue}>Bet: {value}</div>
      <div className={styles.sliderBar}>
        <button onClick={handleDecrement}>-</button>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.sliderInput}
        />
        <button onClick={handleIncrement}>+</button>
      </div>
    </>
  );
};

export default ActionSlider;
