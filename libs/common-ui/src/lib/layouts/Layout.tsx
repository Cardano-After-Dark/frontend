import { LayoutWrapper, MainContent } from './Layout.style';

import Navigation from '../navagation/Navagation';
import Footer from '../footer/Footer';

export type LayoutProps = {
  children: React.ReactChild;
};

export const Layout = ({ children }: LayoutProps) => (
  <LayoutWrapper>
    <Navigation />
    <MainContent>{children}</MainContent>
    <Footer />
  </LayoutWrapper>
);

export default Layout;
