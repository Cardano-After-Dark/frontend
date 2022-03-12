import React from 'react';
import { BladeWrapper } from './Blade.style';

export enum BladeMode {
  primary = 'primary',
  secondary = 'secondary',
  light = 'light',
}

export type BladeProps = {
  mode?: BladeMode;
  minHeight?: string;
  children?: React.ReactChild | React.ReactChild[];
};

export const Blade = ({
  children,
  mode = BladeMode.light,
  minHeight,
}: BladeProps) => (
  <BladeWrapper minHeight={minHeight} mode={mode}>
    {children}
  </BladeWrapper>
);

export default Blade;
