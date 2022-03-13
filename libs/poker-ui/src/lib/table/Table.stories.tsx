import { Story, Meta } from '@storybook/react';
import { Table } from './Table';

export default {
  component: Table,
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
  <Table river={args['river']} players={args['players']} {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  river: <div>River</div>,
};
