import React, { useState } from 'react';
import Editor from "@monaco-editor/react";

const CodeEditorPage = () => {
  const [code, setCode] = useState("// Start coding here...");

  const handleEditorChange = (value, event) => {
    setCode(value);
  };

  return (
    <div style={{ height: '100vh', padding: '1rem' }}>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue={code}
        theme="vs-dark"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditorPage;
