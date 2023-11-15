"use client"

import React, { useState, useEffect } from "react"
import { useNotesStore } from "@/slices/use-notes-store"
import { notes } from "@/data"
import DynamicTextarea from "./dynamic-textarea"
import { useDebounce } from "@/hooks/use-debounce"

export default function EditContent() {
  const { noteId } = useNotesStore()
  const [input, setInput] = useState("")
  const debouncedValue = useDebounce<string>(input, 1000)
  const foundNote = notes.find((note) => noteId === note.id)

  useEffect(() => {
    setInput(foundNote?.content || "")
  }, [noteId])

  useEffect(() => {
    if (!foundNote) return

    for (const noteItem of notes) {
      const {id, title, createdAt, updatedAt} = foundNote

      if (noteItem.id === noteId) {
        noteItem.id = id
        noteItem.title = title
        noteItem.content = input
        noteItem.createdAt = createdAt
        noteItem.updatedAt = updatedAt
      }
    }
    console.log("updated")
  }, [debouncedValue])

  return (
    <DynamicTextarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type your notes"
    />
  )
}
