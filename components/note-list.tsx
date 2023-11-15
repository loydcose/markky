"use client"

import React from "react"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { useNotesStore } from "@/slices/use-notes-store"
import { notes } from "@/data"

export default function NoteList({ note }: { note: any }) {
  const { setNoteId, noteId } = useNotesStore()

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
    <Button
      onClick={() => setNoteId(note.id)}
      key={note.id}
      variant={noteId === note.id ? "default" : "outline"}
      className="flex items-center justify-between gap-2 group text-ellipsis"
    >
      <p>{note.title}</p>
      <Button
        onClick={handleDeleteNote}
        variant={"ghost"}
        className="opacity-0 group-hover:opacity-100"
      >
        <X size={20} />
      </Button>
    </Button>
  )
}
