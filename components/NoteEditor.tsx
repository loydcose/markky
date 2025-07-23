"use client";

import React, { useState } from "react";
import { EditTitle } from "./edit-title";
import EditorJs from "./editor-js";
import { Separator } from "./ui/separator";

type NoteEditorProps = {
  userId: string;
  activeEditor: Editor;
  isNewEditor: boolean;
};

export function NoteEditor({ userId, activeEditor, isNewEditor }: NoteEditorProps) {
  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-6">
        <EditTitle userId={userId} activeEditor={activeEditor} isNewEditor={isNewEditor}/>
      </div>
      <Separator className="bg-gray-200" />
      <div className="flex-1">
        <EditorJs userId={userId} editorId={activeEditor._id} />
      </div>
    </div>
  );
}
