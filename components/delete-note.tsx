import { deleteEditor as deleteEditorAction, revalidateByTag } from "@/actions";
import React, { useRef } from "react";
import { Button } from "./ui/button";
import { useEditorStore } from "@/slices/editors-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useCreateNewEditor } from "@/slices/create-new-editor-store";

export default function DeleteNote({ note }: { note: Editor }) {
  const { deleteEditor, setEditors, editors } = useEditorStore();
  const router = useRouter();
  const deletedNoteRef = useRef<Editor | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setIsShowing } = useCreateNewEditor();

  const handleUndo = () => {
    setIsShowing(null);
    clearTimeout(timeoutRef.current!);
    timeoutRef.current = null;

    if (deletedNoteRef.current) {
      const newEditors = [...editors];
      setEditors(newEditors);
    }

    deletedNoteRef.current = null;
  };

  const handleDelete = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    deletedNoteRef.current = note;
    deleteEditor(note._id); // Remove from store immediately
    setIsShowing(note._id);

    toast("Note deleted", {
      description: `"${note.title}" has been deleted.`,
      action: {
        label: "Undo",
        onClick: () => handleUndo(),
      },
    });
    timeoutRef.current = setTimeout(async () => {
      await deleteEditorAction(note._id);
      revalidateByTag("notes");
      router.replace("/");

      clearTimeout(timeoutRef.current!);
      timeoutRef.current = null;
      deletedNoteRef.current = null;
    }, 4000);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-4 w-4 p-0 text-gray-500 hover:text-red-500"
      onClick={handleDelete}
    >
      <Trash2 className="h-2.5 w-2.5" strokeWidth={1} />
    </Button>
  );
}
