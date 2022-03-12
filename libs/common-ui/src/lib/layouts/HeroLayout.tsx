import { LayoutWrapper, MainContent, Hero } from './HeroLayout.style';

import Footer from '../footer/Footer';
import Image from 'next/image';
import { Brickwall } from '@after-dark-app/images';

export type HeroLayoutProps = {
  children: JSX.Element | JSX.Element[] | string | string[];
};

export const HeroLayout = ({ children }: HeroLayoutProps) => (
  <LayoutWrapper>
    <Hero>
      <Image src={Brickwall} alt="icon" layout="fill" />
    </Hero>
    <MainContent>{children}</MainContent>
  </LayoutWrapper>
);

export default HeroLayout;
