import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 25px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1000;
`;

const IconButton = styled.button<{ disabled: boolean }>`
  background-color: transparent;
  border: 2px solid white;
  color: white;
  font-size: 24px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin: 0 5px;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s;
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
    color: ${(props) => (props.disabled ? 'white' : '#00ff00')};
  }

  &:disabled {
    opacity: 0.5;
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }
`;

interface GameSettingsPanelProps {
  onLeaveTable: () => void;
  onStartGame: () => void;
  isSeated: boolean;
  canStartGame: boolean;
}

const GameSettingsPanel: React.FC<GameSettingsPanelProps> = ({
  onLeaveTable,
  onStartGame,
  isSeated,
  canStartGame,
}) => {
  return (
    <PanelContainer>
      <IconButton
        onClick={onLeaveTable}
        disabled={!isSeated}
        data-tooltip="Leave Table"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </IconButton>
      <IconButton
        onClick={onStartGame}
        disabled={!canStartGame}
        data-tooltip="Start Game"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </IconButton>
    </PanelContainer>
  );
};

export default GameSettingsPanel;
