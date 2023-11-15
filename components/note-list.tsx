"use client"

import React from "react"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { useNotesStore } from "@/slices/use-notes-store"

export default function NoteList({ note }: { note: any }) {
  const { setNoteId, noteId } = useNotesStore()

  return (
    <Button
      onClick={() => setNoteId(note.id)}
      key={note.id}
      variant={noteId === note.id ? "default" : "outline"}
      className="flex items-center justify-between gap-2 group text-ellipsis"
    >
      <p>{note.title}</p>
      <Button variant={"ghost"} className="opacity-0 group-hover:opacity-100">
        <X size={20} />
      </Button>
    </Button>
  )
}
