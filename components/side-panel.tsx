"use client"

import { notes } from "@/data"
import { PanelLeftClose, X, LogOut, Github } from "lucide-react"
import React from "react"
import NoteList from "./note-list"
import { useNotesStore } from "@/slices/use-notes-store"

export default function SidePanel({ className }: { className?: string }) {
  const { setNoteId } = useNotesStore()
  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  const handleCreateNew = () => {
    const id = notes.length + 1
    const prop = {
      id,
      title: "Untitled",
      content: "",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    }
    notes.push(prop)
    setNoteId(id)

    console.log(new Date().toString())
  }

  return (
    <aside className={"flex flex-col " + className}>
      <div className="flex items-start justify-between mb-6">
        <h1 className="font-bold">Markky</h1>
        <button type="button">
          <PanelLeftClose size={20} />
        </button>
      </div>
      <button type="button" onClick={handleCreateNew} className="w-full mb-10">
        Create new
      </button>

      <h2 className="mb-2">Notes</h2>
      <div className="flex flex-col gap-2 mb-10">
        {sortedNotes.map((note) => (
          <NoteList key={note.id} note={note} />
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 mb-4 mt-auto">
        <div className="flex items-center gap-2">
          <span className="h-[30px] aspect-square rounded-full bg-zinc-700"></span>
          <h3 className="font-bold">Loyd Cose</h3>
        </div>
        <button type="button">
          <LogOut size={20} />
        </button>
      </div>
      <footer className="border-t border-t-zinc-800 flex items-center gap-2 justify-between py-2">
        <p className="text-sm">All rights reserved</p>
        <button type="button">
          <Github size={20} />
        </button>
      </footer>
    </aside>
  )
}
