import { useCallback, useEffect, useState } from "react";

import { io } from "socket.io-client";
import CodeMirror from "codemirror";

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

const Editor = () => {
  const [codeEditor, setCodeEditor] = useState();
  const [socket, setSocket] = useState();
  // const [editorText, setEditorText] = useState("");

  useEffect(() => {
    const s = io("http://127.0.0.1:5000");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || codeEditor == null) return;

    const handler = (delta) => {
      const current_pos = codeEditor.getCursor();
      codeEditor.getDoc().setValue(delta);
      codeEditor.setCursor(current_pos);
    };

    socket.on("recieve_changes", handler);

    return () => {
      socket.off("recieve_changes", handler);
    };
  }, [socket, codeEditor]);

  useEffect(() => {
    if (socket == null || codeEditor == null) return;

    const handler = () => {
      // cntrl+A edge case
      if (codeEditor.somethingSelected()) return;
      const value = codeEditor.getValue();
      socket.emit("send_changes", value);
    };
    codeEditor.on("keyup", handler);

    return () => {
      codeEditor.off("keyup", handler);
    };
  }, [socket, codeEditor]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    const codeEditor = CodeMirror(document.body, {
      mode: "python",
      theme: "material",
      ...codeEditorConfig,
    });
    setCodeEditor(codeEditor);
  }, []);

  return <div className="container" ref={wrapperRef}></div>;
};

export default Editor;
