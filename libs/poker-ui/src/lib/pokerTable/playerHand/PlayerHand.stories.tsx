import { Story, Meta } from '@storybook/react';
import { PlayerHand } from './PlayerHand';

export default {
  component: PlayerHand,
  title: 'PlayerHand',
} as Meta;

const Template: Story = (args) => <PlayerHand {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
