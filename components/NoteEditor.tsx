"use client";

import React, { useEffect, useState } from "react";
import { EditTitle } from "./edit-title";
import EditorJs from "./editor-js";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Lock, LockOpen } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { revalidateByPath, updateEditor } from "@/actions";
import { useCreateNewEditor } from "@/slices/create-new-editor-store";
import CreateNewEditorDisplay from "./create-new-editor-display";

type NoteEditorProps = {
  userId: string;
  activeEditor: Editor;
  isNewEditor: boolean;
};

export function NoteEditor({
  userId,
  activeEditor,
  isNewEditor,
}: NoteEditorProps) {
  const [isLocked, setIsLocked] = useState(activeEditor.isLocked);
  const debouncedIsLocked = useDebounce(isLocked, 500);
  const { deletedEditorId } = useCreateNewEditor();

  useEffect(() => {
    const fetch = async () => {
      await updateEditor(activeEditor._id, { isLocked: debouncedIsLocked });
      revalidateByPath("/" + activeEditor.slug);
    };
    fetch();
  }, [debouncedIsLocked]);

  useEffect(() => {
    setIsLocked(activeEditor.isLocked);
  }, [activeEditor.isLocked]);

  const handleLockEditor = async () => {
    setIsLocked(!isLocked);
  };

  if (
    deletedEditorId &&
    deletedEditorId.toString() === activeEditor._id.toString()
  )
    return <CreateNewEditorDisplay userId={userId} />;

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-6 flex items-center gap-2 justify-between">
        <div className="">
          <EditTitle
            userId={userId}
            activeEditor={activeEditor}
            isNewEditor={isNewEditor}
          />
        </div>
        <Button
          title="Lock this note"
          variant={"outline"}
          size={"icon"}
          type="button"
          onClick={handleLockEditor}
          className="text-zinc-600"
        >
          {isLocked ? <Lock /> : <LockOpen />}
        </Button>
      </div>
      <Separator className="bg-gray-200" />
      <div className="flex-1">
        <EditorJs userId={userId} editor={activeEditor} />
      </div>
    </div>
  );
}
