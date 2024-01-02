import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface ActionButtonProps {
  children?: ReactNode;
  onClick: () => void;
  text: string;
  buttonType?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  text,
  buttonType,
}: ActionButtonProps) => {
  const buttonClass = `${styles.baseButton} ${
    buttonType ? styles[buttonType] : ''
  }`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
      {children}
    </button>
  );
};

export default ActionButton;
