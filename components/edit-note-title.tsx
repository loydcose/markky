"use client"

import { useNotesStore } from "@/slices/use-notes-store"
import React, { useState } from "react"

export default function EditNoteTitle() {
  const { selectedNote } = useNotesStore()
  const [input, setInput] = useState(selectedNote?.title || "Untitled")

  

  return (
    <div className="w-full mx-auto max-w-[700px]">
      <input
        type="text"
        className="block min-w-0  outline-none bg-transparent text-zinc-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <hr className="border-none h-px bg-zinc-800 mt-4 mb-8" />
    </div>
  )
}
