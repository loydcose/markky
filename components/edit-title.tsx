"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import {
  getUserEditor,
  revalidateByPath,
  revalidateByTag,
  updateEditor,
} from "@/actions";
import { useNoteTitleStore } from "../slices/note-title-store";
import { useRouter } from "next/navigation";
import { useEditorStore } from "@/slices/editors-store";

type EditTitleProps = {
  userId: string;
  activeEditor: Editor;
  isNewEditor: boolean;
};

export function EditTitle({
  userId,
  activeEditor,
  isNewEditor,
}: EditTitleProps) {
  const [noteTitle, setNoteTitle] = useState(activeEditor.title);
  const debouncedNoteTitle = useDebounce(noteTitle, 500);
  const { renameEditor } = useEditorStore();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log({ isNewEditor });
    if (isNewEditor) {
      setTimeout(() => {
        // ref.current?.focus();
        ref.current?.select();
      }, 200);
    }
  }, [isNewEditor]);

  useEffect(() => {
    if (debouncedNoteTitle && debouncedNoteTitle !== activeEditor.title) {
      updateEditor(activeEditor._id, { title: debouncedNoteTitle });
    }
  }, [debouncedNoteTitle, activeEditor._id, activeEditor.title]);

  useEffect(() => {
    setNoteTitle(activeEditor.title);
  }, [activeEditor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    renameEditor(activeEditor._id, e.target.value);
    setNoteTitle(e.target.value);
  };

  return (
    <Input
      ref={ref}
      onBlur={() => {
        revalidateByTag("notes");
        console.log("revalidated!");
      }}
      value={noteTitle}
      onChange={handleChange}
      className="text-2xl font-bold bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900 placeholder:text-gray-400"
      placeholder="Enter note title..."
    />
  );
}
