import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface PokerUiProps {}

const StyledPokerUi = styled.div`
  color: pink;
`;

export function PokerUi(props: PokerUiProps) {
  return (
    <StyledPokerUi>
      <h1>Welcome to PokerUi!</h1>
    </StyledPokerUi>
  );
}

export default PokerUi;
