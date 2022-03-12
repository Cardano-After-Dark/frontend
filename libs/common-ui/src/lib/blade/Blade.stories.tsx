import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Blade, { BladeMode } from './Blade';

export default {
  title: 'Components/Blade',
  component: Blade,
  argTypes: {
    mode: {
      description: 'Defines the colors used for background and text.',
    },
  },
} as ComponentMeta<typeof Blade>;

const Template: ComponentStory<typeof Blade> = (args) => (
  <Blade {...args}>This is a Blade</Blade>
);

export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
  mode: BladeMode.primary,
};

export const Secondary = Template.bind({});
Secondary.args = {
  mode: BladeMode.secondary,
};
