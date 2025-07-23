"use client";

import { initEditor } from "../lib/editor";
import React, { useEffect } from "react";

export default function EditorJs({
  userId,
  editor,
}: {
  userId: string;
  editor: Editor;
}) {
  useEffect(() => {
    const initializeEditor = async () => {
      const holderEl = document.getElementById("editorjs");
      if (holderEl) holderEl.innerHTML = ""; // destroy any existing editor

      await initEditor(userId, editor._id, editor.isLocked);
    };

    initializeEditor();
  }, [editor.isLocked, editor._id, userId]);

  return <div id="editorjs" className="editor-js-formats p-6" />;
}
