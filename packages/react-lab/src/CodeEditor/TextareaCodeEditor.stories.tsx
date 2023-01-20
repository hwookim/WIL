import { ComponentStory } from '@storybook/react';

import TextareaCodeEditor from './TextareaCodeEditor';
import { SAMPLE_CODE } from './DATA';

export default {
  component: TextareaCodeEditor,
  title: 'CodeEditor/TextareaCodeEditor',
};

const Template: ComponentStory<typeof TextareaCodeEditor> = (args) => (
  <TextareaCodeEditor {...args} />
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  language: 'js',
  value: SAMPLE_CODE,
};
