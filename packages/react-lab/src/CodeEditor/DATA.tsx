export const SAMPLE_CODE = `
import React from 'react';
import CodeEditor, {
  TextareaCodeEditorProps,
} from '@uiw/react-textarea-code-editor';

interface CodeEditorProps extends TextareaCodeEditorProps {
  value: string;
  disabled: boolean;
  language: string;
}

const TextareaCodeEditor = (props: CodeEditorProps) => {
  const { value } = props;
  return <CodeEditor {...props} value={value.trim()} />;
};

export default TextareaCodeEditor;
`;
