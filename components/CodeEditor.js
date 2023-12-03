import "codemirror/mode/sql/sql";
import { hint } from "codemirror";
import "codemirror/theme/material.css";
import "codemirror/addon/hint/sql-hint";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import CodeMirror from "@uiw/react-codemirror";

export default function CodeEditor({ setCode, value }) {
  return (
    <CodeMirror
      value={value ? value : ""}
      height="100%"
      width="100%"
      onChange={(editor) => {
        setCode(editor.getValue());
      }}
      options={{
        hintOptions: { completeSingle: false, hint: hint.sql },
        showHint: true,
        autofocus: true,
        autocapitalize: true,
        lineWrapping: true,
        theme: "material",
        mode: "text/x-mysql",
        extraKeys: { "Ctrl-Space": "autocomplete" },
      }}
    />
  );
}
