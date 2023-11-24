"use client"

import { getUserNotes, updateNote } from "@/actions"
import { useDebounce } from "@/hooks/use-debounce"
import { useNotesStore } from "@/slices/use-notes-store"
import React, { useEffect, useState } from "react"

export default function EditNoteTitle() {
  const { selectedNote, user, setUserNotes } = useNotesStore()
  const [input, setInput] = useState(selectedNote?.title || "Untitled")
  const debouncedValue = useDebounce<string>(input, 1000)
  const maxLength = 34

  useEffect(() => {
    setInput(selectedNote?.title || "")
  }, [selectedNote])

  const updateContent = async () => {
    if (!selectedNote) return
    if (!input.trim()) return
    if (input.length > maxLength) return

    try {
      await updateNote(selectedNote._id, { title: input })

      // refresh fetch? that's a bad idea literally. But let's try
      const userNotes = await getUserNotes(user?._id || "")
      setUserNotes(userNotes)
    } catch (error: any) {
      console.log(error.message)
    }
  }
// Ok this is a title for this note
  useEffect(() => {
    updateContent()
  }, [debouncedValue])

  return (
    <div className="w-full mx-auto max-w-[700px]">
      <input
        type="text"
        className="block min-w-0 w-full outline-none bg-transparent text-zinc-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={maxLength}
      />
      <hr className="border-none h-px bg-zinc-800 mt-4 mb-8" />
    </div>
  )
}
