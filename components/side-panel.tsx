"use client"

import { notes } from "@/data"
import { PanelLeftClose, X, LogOut, Github, Pin, Clock } from "lucide-react"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import NoteList from "./note-list"
import { useNotesStore } from "@/slices/use-notes-store"
import { createNote, getUserNotes } from "@/actions"

type SidePanelProps = {
  className?: string
}

export default function SidePanel({
  className,
}: SidePanelProps) {
  const { userNotes, user, setUserNotes } = useNotesStore()
  // const sortedNotes = userNotes.sort(
  //   (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  // )

  const handleCreateNew = async () => {
    try {
      await createNote(user?._id || "")
      // refresh fetch? that's a bad idea literally. But let's try
      const userNotes = await getUserNotes(user?._id || "")
      setUserNotes(userNotes)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <aside
      className={
        "flex flex-col p-8 max-h-screen text-zinc-600 border border-zinc-800 rounded-2xl " +
        className
      }
    >
      <button
        type="button"
        onClick={handleCreateNew}
        className="w-full mb-10 px-2 py-1 rounded-md border border-zinc-800 hover:bg-zinc-800 transition-all hover:text-zinc-300"
      >
        Create new
      </button>

      <Pin size={20} className="text-zinc-600 mb-3" />
      <ul className="flex flex-col gap-1 mb-10">
        {userNotes.map((note, index) => {
          return (
            note.isPinned && (
              <NoteList key={note._id} note={note} index={index} />
            )
          )
        })}
      </ul>

      <Clock size={20} className="text-zinc-600 mb-3" />
      <ul className="flex flex-col gap-1 mb-10">
        {userNotes.map((note, index) => {
          return (
            !note.isPinned && (
              <NoteList key={note._id} note={note} index={index} />
            )
          )
        })}
      </ul>

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
