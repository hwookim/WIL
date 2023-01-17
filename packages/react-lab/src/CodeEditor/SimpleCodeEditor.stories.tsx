import { ComponentStory } from '@storybook/react';

import SimpleCodeEditor from './SimpleCodeEditor';

export default {
  component: SimpleCodeEditor,
  title: 'CodeEditor/SimpleCodeEditor',
};

const Template: ComponentStory<typeof SimpleCodeEditor> = (args) => (
  <SimpleCodeEditor {...args} />
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  theme: 'dark',
};
