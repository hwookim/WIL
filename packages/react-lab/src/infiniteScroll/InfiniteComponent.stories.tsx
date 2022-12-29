import React from 'react';
import { ComponentStory } from '@storybook/react';

import InfiniteComponent from './InfiniteComponent';

export default {
  component: 'InfiniteComponent',
  title: 'InfiniteComponent',
};

const Template: ComponentStory<typeof InfiniteComponent> = () => (
  <InfiniteComponent />
);

export const Default = Template.bind({});
