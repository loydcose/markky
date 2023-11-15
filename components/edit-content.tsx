"use client"

import React, { useState, useEffect } from "react"
import { useNotesStore } from "@/slices/use-notes-store"
import { notes } from "@/data"
import DynamicTextarea from "./dynamic-textarea"

export default function EditContent() {
  const { noteId } = useNotesStore()
  const [input, setInput] = useState("")

  useEffect(() => {
    setInput(notes.find((note) => noteId === note.id)?.content || "")
  }, [noteId])

  return (
    <DynamicTextarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type your notes"
    />
  )
}
