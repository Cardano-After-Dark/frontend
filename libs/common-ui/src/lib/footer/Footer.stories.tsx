import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Footer from './Footer';

export default {
  title: 'Structural/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => <Footer />;

export const Basic = Template.bind({});
