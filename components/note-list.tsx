"use client"

import React from "react"
import { X } from "lucide-react"
import { useNotesStore } from "@/slices/use-notes-store"
import { notes } from "@/data"
import { cn } from "@/lib/utils"
import { deleteNote, getUserNotes } from "@/actions"

export default function NoteList({
  note,
  index,
}: {
  note: any
  index: number
}) {
  const { setSelectedNote, selectedNote, setUserNotes, user } = useNotesStore()
  const isSelected = selectedNote?._id === note._id

  const handleDeleteNote = async () => {
    try {
      await deleteNote(note._id)

      // refresh fetch? that's a bad idea literally. But let's try
      const userNotes = await getUserNotes(user?._id || "")
      setUserNotes(userNotes)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <li className="relative flex items-center justify-between gap-2 group isolation-auto">
      <span className="absolute -inset-y-1 -inset-x-2 transition-all group-hover:bg-zinc-800 rounded-md -z-10"></span>
      <button
        type="button"
        onClick={() => setSelectedNote(note)}
        key={note.id}
        className="w-full text-left"
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
        onClick={(e) => handleDeleteNote()}
        className="text-zinc-600 hover:text-zinc-400 transition-all opacity-0 group-hover:opacity-100"
      >
        <X size={20} />
      </button>
    </li>
  )
}
