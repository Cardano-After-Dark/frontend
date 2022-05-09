import { LayoutWrapper, MainContent, MainFooter } from './Layout.style';

import Navigation from '../navagation/Navagation';

export type LayoutProps = {
  children: React.ReactChild;
};

export const Layout = ({ children }: LayoutProps) => (
  <LayoutWrapper>
    <MainContent>{children}</MainContent>
    <MainFooter>
      <Navigation />
    </MainFooter>
  </LayoutWrapper>
);

export default Layout;
