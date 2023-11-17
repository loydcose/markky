"use client"

import { notes } from "@/data"
import { PanelLeftClose, X, LogOut, Github, Pin, Clock } from "lucide-react"
import React, { Dispatch, SetStateAction } from "react"
import NoteList from "./note-list"
import { useNotesStore } from "@/slices/use-notes-store"

type SidePanelProps = {
  className?: string
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>
}

export default function SidePanel({
  className,
  setIsSidePanelOpen,
}: SidePanelProps) {
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
      isPinned: false,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    }
    notes.push(prop)
    setNoteId(id)
  }

  return (
    <aside
      className={
        "flex flex-col p-8 md:p-16 h-screen text-zinc-600 " +
        className
      }
    >
      <div className="flex items-center gap-2 justify-between mb-6 md:mb-0">
        <h1 className="font-bold text-zinc-300 md:mb-6">Markky</h1>
        <button
          onClick={() => setIsSidePanelOpen(false)}
          type="button"
          className="text-zinc-600 hover:text-zinc-400 transition-all md:hidden"
        >
          <X size={20} />
        </button>
      </div>
      <button
        type="button"
        onClick={handleCreateNew}
        className="w-full mb-10 px-2 py-1 rounded-md border border-zinc-800 hover:bg-zinc-800 transition-all hover:text-zinc-300"
      >
        Create new
      </button>

      <Pin size={20} className="text-zinc-600 mb-3" />
      <div className="flex flex-col gap-1 mb-10">
        {sortedNotes.map((note) => {
          return note.isPinned && <NoteList key={note.id} note={note} />
        })}
      </div>

      <Clock size={20} className="text-zinc-600 mb-3" />
      <div className="flex flex-col gap-1 mb-10">
        {sortedNotes.map((note) => {
          return !note.isPinned && <NoteList key={note.id} note={note} />
        })}
      </div>

      <footer className="flex items-center gap-2 justify-between mt-auto">
        <p className="text-sm">Markky @ 2023</p>
        <button
          type="button"
          className="text-zinc-600 hover:text-zinc-400 transition-all p-2"
        >
          <Github size={20} />
        </button>
      </footer>
    </aside>
  )
}
