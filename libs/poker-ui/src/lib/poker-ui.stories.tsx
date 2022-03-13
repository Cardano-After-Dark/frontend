import { Story, Meta } from '@storybook/react';
import { PokerUi, PokerUiProps } from './poker-ui';

export default {
  component: PokerUi,
  title: 'PokerUi',
} as Meta;

const Template: Story<PokerUiProps> = (args) => <PokerUi {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
