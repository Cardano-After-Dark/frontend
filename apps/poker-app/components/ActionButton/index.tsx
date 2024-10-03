import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ActionButtonProps {
  children?: ReactNode;
  onClick: () => void;
  text: string;
  subText?: string;
  buttonType?: 'bet' | 'fold';
  disabled?: boolean;
}

const StyledButton = styled.button<{
  $buttonType: 'bet' | 'fold';
  disabled: boolean;
}>`
  background-color: transparent;
  border: 2px solid white;
  color: white;
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 4px 8px;
  border-radius: 20px;
  transition: all 0.3s;
  width: 100%;
  height: 50px; // Increased height to accommodate two lines of text
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
    color: ${(props) =>
      props.disabled
        ? 'white'
        : props.$buttonType === 'bet'
        ? '#00ff00'
        : '#ff0000'};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const MainText = styled.span`
  font-weight: bold;
  margin-bottom: 2px;
`;

const SubText = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  text,
  subText,
  buttonType = 'bet',
  disabled = false,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      $buttonType={buttonType}
      disabled={disabled}
      title={`${text} ${subText || ''}`}
    >
      <MainText>{text}</MainText>
      {subText && <SubText>{subText}</SubText>}
    </StyledButton>
  );
};

export default ActionButton;
