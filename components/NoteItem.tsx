import {
  deleteEditor as deleteEditorAction,
  revalidateByTag,
  updateEditor,
} from "@/actions";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useEditorStore } from "@/slices/editors-store";

export function NoteItem({
  note,
  user,
  isFavorite = false,
}: {
  note: Editor;
  user: User;
  isFavorite?: boolean;
}) {
  const { deleteEditor, favoriteEditor } = useEditorStore();
  const router = useRouter();

  const handleDelete = async () => {
    deleteEditor(note._id);
    await deleteEditorAction(note._id);
    revalidateByTag("notes");
    router.replace("/");
  };

  const handleFavorite = async () => {
    favoriteEditor(note._id, !note.isPinned);
    await updateEditor(note._id, { isPinned: !note.isPinned });
    revalidateByTag("notes");
  };

  return (
    <div className="group flex items-center gap-2 px-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
      <Link
        href={`/${note.slug}`}
        className="flex-1 text-sm text-gray-900 truncate py-2"
      >
        {note.title}
      </Link>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="ghost"
          className={`h-6 w-6 p-0 hover:bg-gray-100 ${
            note.isPinned ? "text-red-500" : "text-gray-400"
          }`}
          onClick={handleFavorite}
        >
          <Heart
            className="h-3 w-3"
            // fill={note.isPinned ? "currentColor" : "none"}
          />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-100"
          onClick={handleDelete}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
