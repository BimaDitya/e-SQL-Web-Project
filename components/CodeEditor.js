import { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { materialDark } from "@uiw/codemirror-themes-all";

export default function CodeEditor({ setCode, value, answers }) {
  const onChange = useCallback(
    (code) => {
      setCode(code);
    },
    [setCode],
  );
  return (
    <>
      <CodeMirror
        readOnly={answers}
        extensions={[langs.mysql()]}
        theme={materialDark}
        height="12em"
        basicSetup={{
          history: false,
          foldGutter: false,
          dropCursor: false,
          indentOnInput: false,
          allowMultipleSelections: false,
        }}
        value={answers ? answers : value}
        onChange={onChange}
      />
    </>
  );
}
