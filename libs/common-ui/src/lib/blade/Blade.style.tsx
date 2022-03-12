import styled from '@emotion/styled';
import { theme } from '../theme';
import { BladeMode, BladeProps } from './Blade';

export const BladeWrapper = styled.div<BladeProps>`
  display: block;
  position: relative;
  padding: 30px 20px;
  margin: 0px;
  ${(props) => props.minHeight && `min-height: ${props.minHeight};`}
  ${(props) => {
    switch (props.mode) {
      case BladeMode.primary:
        return `background-color: ${theme.palette.primary.main};
          color: ${theme.palette.common.white};`;
      case BladeMode.secondary:
        return `background-color: ${theme.palette.secondary.main};
          color: ${theme.palette.common.white};`;
      default:
        return `background-color: ${theme.palette.common.white};
          color: ${theme.palette.primary.main};`;
    }
  }}
`;
