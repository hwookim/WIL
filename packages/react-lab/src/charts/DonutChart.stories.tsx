import React from 'react';
import { ComponentStory } from '@storybook/react';

import DonutChart from './DonutChart';

export default {
  component: 'DonutChart',
  title: 'charts/DonutChart',
};

const Template: ComponentStory<typeof DonutChart> = (args) => (
  <DonutChart {...args} />
);

export const Default = Template.bind({});
Default.args = {
  dataset: [
    {
      color: '#ddd',
      value: 10,
    },
    {
      color: '#bbb',
      value: 20,
    },
    {
      color: '#aaa',
      value: 30,
    },
    {
      color: '#888',
      value: 40,
    },
  ],
};
