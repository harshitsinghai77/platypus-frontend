import { UnControlled as CodeMirror } from "react-codemirror2-react-17";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";

require("codemirror/mode/javascript/javascript");
require("codemirror/mode/python/python");

const codeEditorConfig = {
  lineNumbers: true,
  indentUnit: 4,
  indentWithTabs: true,
  lint: true,
  autoCursor: true,
  autoCloseBrackets: true,
  extraKeys: {
    "Ctrl-Space": "autocomplete",
  },
};

const CodeEditor = () => {
  const codeMirror = (
    <CodeMirror
      className="text-left"
      value="async const hello_world = () ->"
      options={{
        mode: "python",
        // theme: "material",
        ...codeEditorConfig,
      }}
      cursor={{
        line: 2,
        ch: 1,
      }}
      onChange={(editor, data, value) => {
        console.log({ editor, data, value });
      }}
    />
  );
  return codeMirror;
};

export default CodeEditor;
