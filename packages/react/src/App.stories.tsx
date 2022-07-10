import React from 'react';
import { ComponentStory } from '@storybook/react';
import App from './App';

export default {
  component: App,
  title: 'App',
};

const Template: ComponentStory<typeof App> = () => <App />;

export const Default = Template.bind({});