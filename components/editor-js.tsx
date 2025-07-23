"use client";

import { initEditor } from "../lib/editor";
import React, { useEffect, useState } from "react";

export default function EditorJs({
  userId,
  editor,
}: {
  userId: string;
  editor: Editor;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) return;

    const initializeEditor = async () => {
      const holderEl = document.getElementById("editorjs");
      if (holderEl) holderEl.innerHTML = ""; // destroy any existing editor

      await initEditor(userId, editor._id, editor.isLocked);
    };

    initializeEditor();
  }, [isMounted, editor.isLocked, editor._id, userId]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <div id="editorjs" className="editor-js-formats p-6" />;
}
