import styled from '@emotion/styled';

export const MainContent = styled.main``;

export const LayoutWrapper = styled.section``;

export const Hero = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -1;
`;

export const HeroChild = styled.div`
  grid-area: 1/1;
  position: relative;
  place-items: center;
  display: grid;
  color: white;
`;
