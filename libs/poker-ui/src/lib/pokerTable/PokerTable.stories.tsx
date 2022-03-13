import { Story, Meta } from '@storybook/react';
import { PokerTable } from './PokerTable';

export default {
  component: PokerTable,
  title: 'Table',
  argTypes: {
    river: {
      description: 'The River',
    },
    players: {
      description: 'Information about the other players',
    },
  },
} as Meta;

const Template: Story = (args) => (
  <PokerTable river={args['river']} players={args['players']} {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  river: <div>River</div>,
};
