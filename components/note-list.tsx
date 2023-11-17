"use client"

import React from "react"
import { X } from "lucide-react"
import { useNotesStore } from "@/slices/use-notes-store"
import { notes } from "@/data"
import { cn } from "@/lib/utils"

export default function NoteList({ note }: { note: any }) {
  const { setNoteId, noteId } = useNotesStore()
  const isSelected = noteId === note.id

  const handleDeleteNote = () => {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === noteId) {
        notes.splice(i, 1)
        break
      }
    }
    // const sortedNotes = [...notes].sort(
    //   (a, b) =>
    //     new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    // )
    // console.log(sortedNotes[0].id)
    // setNoteId(sortedNotes[0].id)
  }

  return (
    <button
      type="button"
      onClick={() => setNoteId(note.id)}
      key={note.id}
      className="relative flex items-center justify-between gap-2 group text-ellipsis isolation-auto"
    >
      <span className="absolute -inset-y-1 -inset-x-2 transition-all group-hover:bg-zinc-800 rounded-md -z-10"></span>
      <p className={cn("group-hover:text-zinc-300 transition-all", isSelected && "text-zinc-300")}>{note.title}</p>
      <button
        type="button"
        onClick={handleDeleteNote}
        className="text-zinc-600 hover:text-zinc-400 transition-all opacity-0 group-hover:opacity-100"
      >
        <X size={20} />
      </button>
    </button>
  )
}
