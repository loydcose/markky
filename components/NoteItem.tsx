import {
  deleteEditor as deleteEditorAction,
  revalidateByTag,
  updateEditor,
} from "@/actions";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();
  const isActive = pathname === `/${note.slug}`;

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
    <div
      className={`group flex items-center gap-1 px-1 rounded-md bg-white hover:bg-zinc-100 transition-colors ${
        isActive ? "bg-zinc-100" : ""
      }`}
    >
      <Link
        href={`/${note.slug}`}
        className="flex-1 text-xs text-gray-900 truncate py-1 flex flex-col gap-0.5"
      >
        <span className="truncate w-full block max-w-[200px]">{note.title}</span>
        <span className="flex items-center gap-0.5 text-[10px] text-zinc-500">
          <Calendar size={11} />
          {new Date(note.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </Link>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          variant="ghost"
          className={`h-4 w-4 p-0 text-gray-500 hover:text-gray-700`}
          onClick={handleFavorite}
        >
          <Star className="h-2.5 w-2.5" strokeWidth={1} />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-4 w-4 p-0 text-gray-500 hover:text-red-500"
          onClick={handleDelete}
        >
          <Trash2 className="h-2.5 w-2.5" strokeWidth={1} />
        </Button>
      </div>
    </div>
  );
}
