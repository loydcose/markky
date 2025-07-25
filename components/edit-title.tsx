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
import { Calendar } from "lucide-react";

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
    if (isNewEditor) {
      setTimeout(() => {
        ref.current?.select();
      }, 400);
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
    <div className="flex flex-col gap-1">
      <Input
        ref={ref}
        onBlur={() => {
          revalidateByTag("notes");
        }}
        maxLength={64}
        value={noteTitle}
        onChange={handleChange}
        className="min-w-0 truncate font-bold bg-transparent shadow-none border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900 placeholder:text-gray-400"
        placeholder="Enter note title..."
      />
      <span className="flex items-center gap-1 text-xs text-zinc-500">
        <Calendar size={14} />
        {new Date(activeEditor.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    </div>
  );
}
