import { Story, Meta } from '@storybook/react';
import { River } from './River';

export default {
  component: River,
  title: 'River',
} as Meta;

const Template: Story = (args) => <River {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
