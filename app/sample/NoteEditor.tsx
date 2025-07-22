"use client";

import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { EditTitle } from "./edit-title";
import EditorJs from "../v2/editor-js";

type NoteEditorProps = {
  userId: string;
  activeEditor: Editor;
};

export function NoteEditor({ userId, activeEditor }: NoteEditorProps) {
  const [editorContent, setEditorContent] = useState("");

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-600 mb-4">My notes</h2>
        <EditTitle userId={userId} activeEditor={activeEditor} />
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-6">
        <EditorJs userId={userId} editorId={activeEditor._id} />
        {/* <Textarea
          value={editorContent}
          onChange={(e) => setEditorContent(e.target.value)}
          placeholder="Start writing your note..."
          className="w-full h-full resize-none bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-700 placeholder:text-gray-400 text-base leading-relaxed"
        /> */}
      </div>
    </div>
  );
}
