import styled from '@emotion/styled';
import { theme } from '../theme';

export const StyledFooter = styled.footer`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 30px;
  margin: 0;
  background: transparent;
  color: ${theme.palette.common.white};
  font-weight: 700;
  font-size: 1.3em;
  grid-area: footer;
`;
