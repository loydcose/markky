"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { updateEditor } from "@/actions";

type EditTitleProps = {
  activeEditor: Editor;
};

export function EditTitle({ activeEditor }: EditTitleProps) {
  const [noteTitle, setNoteTitle] = useState(activeEditor.title);
  const debouncedNoteTitle = useDebounce(noteTitle, 500);

  useEffect(() => {
    if (debouncedNoteTitle && debouncedNoteTitle !== activeEditor.title) {
      updateEditor(activeEditor._id, { title: debouncedNoteTitle });
    }
  }, [debouncedNoteTitle, activeEditor._id, activeEditor.title]);

  useEffect(() => {
    setNoteTitle(activeEditor.title);
  }, [activeEditor]);

  return (
    <Input
      value={noteTitle}
      onChange={(e) => setNoteTitle(e.target.value)}
      className="text-xl font-medium bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900 placeholder:text-gray-400"
      placeholder="Enter note title..."
    />
  );
}
