import { LayoutWrapper, MainContent } from './Layout.style';

import Navigation from '../navagation/Navagation';

export type LayoutProps = {
  children: React.ReactChild;
};

export const Layout = ({ children }: LayoutProps) => (
  <LayoutWrapper>
    <MainContent>{children}</MainContent>
    <Navigation />
  </LayoutWrapper>
);

export default Layout;
