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
      color: '#aaa',
      rate: 0.1,
    },
    {
      color: '#bbb',
      rate: 0.2,
    },
    {
      color: '#ddd',
      rate: 0.3,
    },
    {
      color: '#666',
      rate: 0.4,
    },
  ],
};
