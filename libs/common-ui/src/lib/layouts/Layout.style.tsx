import styled from '@emotion/styled';

export const MainContent = styled.main`
  min-height: 200px;
  padding: 20px;
  grid-area: main;
`;

export const LayoutWrapper = styled.section`
  min-height: 100vh;
  background-image: url(https://cdn.pokernow.club/background-d2c70dea8bbded04f5de.jpg);
  background-size: cover;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 100px auto 100px;
  grid-template-areas: 'navigation' 'main' 'footer';
`;
