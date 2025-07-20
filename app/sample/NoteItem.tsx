import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import React from "react";

export function NoteItem({
  note,
  isFavorite = false,
}: {
  note: { id: number; title: string };
  isFavorite?: boolean;
}) {
  return (
    <div className="group flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
      <div className="flex-1 text-sm text-gray-900 truncate">{note.title}</div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="ghost"
          className={`h-6 w-6 p-0 hover:bg-gray-100 ${
            isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
        >
          <Heart
            className="h-3 w-3"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-100"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
