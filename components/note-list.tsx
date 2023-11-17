"use client"

import React from "react"
import { X } from "lucide-react"
import { useNotesStore } from "@/slices/use-notes-store"
import { notes } from "@/data"
import { cn } from "@/lib/utils"

export default function NoteList({
  note,
  index,
}: {
  note: any
  index: number
}) {
  const { setNoteId, noteId } = useNotesStore()
  const isSelected = noteId === note.id

  const handleDeleteNote = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    e.preventDefault()
    notes.splice(index, 1)
    setNoteId(notes[0]?.id)
  }

  return (
    <li className="relative flex items-center justify-between gap-2 group isolation-auto">
      <span className="absolute -inset-y-1 -inset-x-2 transition-all group-hover:bg-zinc-800 rounded-md -z-10"></span>
      <button
        type="button"
        onClick={() => setNoteId(note.id)}
        key={note.id}
        className=""
      >
        <p
          className={cn(
            "group-hover:text-zinc-300 transition-all text-ellipsis",
            isSelected && "text-zinc-300"
          )}
        >
          {note.title}
        </p>
      </button>
      <button
        type="button"
        onClick={(e) => handleDeleteNote(e)}
        className="text-zinc-600 hover:text-zinc-400 transition-all opacity-0 group-hover:opacity-100"
      >
        <X size={20} />
      </button>
    </li>
  )
}
