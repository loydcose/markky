"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { updateEditor } from "@/actions";
import { revalidatePath } from "next/cache";

type NoteEditorProps = {
  activeEditor: Editor;
};

export function NoteEditor({ activeEditor }: NoteEditorProps) {
  const [noteTitle, setNoteTitle] = useState(activeEditor.title);
  const [editorContent, setEditorContent] = useState("");
  const debouncedNoteTitle = useDebounce(noteTitle, 500);

  useEffect(() => {
    if (debouncedNoteTitle) {
      updateEditor(activeEditor._id, { title: debouncedNoteTitle });
    }
  }, [debouncedNoteTitle, activeEditor._id]);

  useEffect(() => {
    setNoteTitle(activeEditor.title);
  }, [activeEditor]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-600 mb-4">My notes</h2>
        <Input
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          className="text-xl font-medium bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900 placeholder:text-gray-400"
          placeholder="Enter note title..."
        />
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-6">
        <Textarea
          value={editorContent}
          onChange={(e) => setEditorContent(e.target.value)}
          placeholder="Start writing your note..."
          className="w-full h-full resize-none bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-700 placeholder:text-gray-400 text-base leading-relaxed"
        />
      </div>
    </div>
  );
}
