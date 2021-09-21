import { useEffect, useState } from "react";

import { io } from "socket.io-client";

import CodeEditor from "../../components/codeMirror";

const Editor = () => {
  const [socket, setSocket] = useState();
  const [editorText, setEditorText] = useState();

  useEffect(() => {
    const s = io("http://127.0.0.1:5000");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;

    const handler = (delta) => {
      console.log("delta", delta);
      setEditorText(delta);
    };
    socket.on("recieve_changes", handler);

    return () => {
      socket.off("recieve_changes", handler);
    };
  }, [socket]);

  const onTextChange = (event) => {
    if (socket == null) return;
    socket.emit("send_changes", event.target.value);
  };

  return <CodeEditor />;
};

export default Editor;
