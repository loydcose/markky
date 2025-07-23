"use client";

import { initEditor } from "../lib/editor";
import React, { useEffect, useState } from "react";

export default function EditorJs({
  userId,
  editorId,
}: {
  userId: string;
  editorId: string;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) return;

    initEditor(userId, editorId);
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <div
        id="editorjs"
        className="editor-js-formats p-6"
      />
    </>
  );
}
