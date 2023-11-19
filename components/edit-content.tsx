"use client"

import React, { useState, useEffect } from "react"
import { useNotesStore } from "@/slices/use-notes-store"
import { notes } from "@/data"
import DynamicTextarea from "./dynamic-textarea"
import { useDebounce } from "@/hooks/use-debounce"
import { getUserNotes, updateNote } from "@/actions"

export default function EditContent() {
  const { selectedNote, setUserNotes, user } =
    useNotesStore()
  const [input, setInput] = useState(selectedNote?.content || "")
  const debouncedValue = useDebounce<string>(input, 1000)

  useEffect(() => {
    setInput(selectedNote?.content || "")
  }, [selectedNote])

  const updateContent = async () => {
    if (!selectedNote) return

    try {
      await updateNote(selectedNote._id, { content: input })

      // refresh fetch? that's a bad idea literally. But let's try
      const userNotes = await getUserNotes(user?._id || "")
      setUserNotes(userNotes)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    updateContent()
  }, [debouncedValue])

  return (
    <DynamicTextarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type your notes here..."
    />
  )
}
