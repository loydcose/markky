"use client";

import React, { useState } from "react";
import { EditTitle } from "./edit-title";
import EditorJs from "./editor-js";

type NoteEditorProps = {
  userId: string;
  activeEditor: Editor;
};

export function NoteEditor({ userId, activeEditor }: NoteEditorProps) {
  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-6">
        <EditTitle userId={userId} activeEditor={activeEditor} />
      </div>

      <div className="flex-1 p-6">
        <EditorJs userId={userId} editorId={activeEditor._id} />
      </div>
    </div>
  );
}
