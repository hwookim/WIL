import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import styled from '@emotion/styled';

export type PrismTheme = 'tomorrow' | 'dark' | 'okaidia';

export interface CodeEditorProps {
  disabled: boolean;
  theme: PrismTheme;
}

export default function SimpleCodeEditor({
  disabled,
  theme,
}: CodeEditorProps): JSX.Element {
  import(`prismjs/themes/prism-${theme}.css`);

  const [code, setCode] = useState<string>(
    'function add(a, b) {\n  return a + b;\n}',
  );

  return (
    <Container>
      <Editor
        onValueChange={setCode}
        highlight={(code) => highlight(code, languages.js, 'javascript')}
        value={code}
        disabled={disabled}
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 24px;
  min-height: 200px;
  background-color: #212529;
  color: white;
`;
