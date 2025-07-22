"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { getUserEditor, revalidateByPath, updateEditor } from "@/actions";
import { useNoteTitleStore } from "./note-title-store";
import { useRouter } from "next/navigation";

type EditTitleProps = {
  userId: string;
  activeEditor: Editor;
};

export function EditTitle({ userId, activeEditor }: EditTitleProps) {
  const router = useRouter();
  const [noteTitle, setNoteTitle] = useState(activeEditor.title);
  const debouncedNoteTitle = useDebounce(noteTitle, 500);
  const updateTitle = useNoteTitleStore((state) => state.updateTitle);

  useEffect(() => {
    if (debouncedNoteTitle && debouncedNoteTitle !== activeEditor.title) {
      updateEditor(activeEditor._id, { title: debouncedNoteTitle });
      revalidateByPath("/sample/" + activeEditor.slug);
    }
  }, [debouncedNoteTitle, activeEditor._id, activeEditor.title]);

  useEffect(() => {
    setNoteTitle(activeEditor.title);
  }, [activeEditor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.target.value);
    updateTitle(activeEditor._id, e.target.value);
  };

  return (
    <Input
      value={noteTitle}
      onChange={handleChange}
      className="text-xl font-medium bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900 placeholder:text-gray-400"
      placeholder="Enter note title..."
    />
  );
}
