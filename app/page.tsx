"use client"

import {
  PanelLeftClose,
  X,
  LogOut,
  Github,
  PanelLeftOpen,
  Sun,
  Menu,
  Pin,
} from "lucide-react"

import SidePanel from "@/components/side-panel"
import EditContent from "@/components/edit-content"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useNotesStore } from "@/slices/use-notes-store"
import { notes } from "@/data"

export default function Home() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const { noteId } = useNotesStore()
  const foundNote = notes.find((note) => noteId === note.id)

  const handlePinNote = () => {
    if (!foundNote) return

    for (const noteItem of notes) {
      const { id, title, createdAt, updatedAt, isPinned, content } = foundNote

      if (noteId === noteItem.id) {
        noteItem.id = id
        noteItem.title = title
        noteItem.content = content
        noteItem.createdAt = createdAt
        noteItem.updatedAt = updatedAt
        noteItem.isPinned = !isPinned
        break
      }
    }
  }

  return (
    <main className="flex">
      <SidePanel
        className="hidden md:block top-0 w-[400px] shrink-0 sticky"
        setIsSidePanelOpen={setIsSidePanelOpen}
      />
      <SidePanel
        className={cn(
          "h-full fixed md:hidden top-0 w-[80%] left-0 bottom-0 bg-[#1A1A1D]",
          isSidePanelOpen ? "flex" : "hidden"
        )}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />

      <section className="p-8 md:p-16 grow w-full">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              className="text-zinc-600 hover:text-zinc-400 transition-all"
              onClick={() => setIsSidePanelOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h1 className="font-bold text-zinc-300">Markky</h1>
          </div>
          <div className="flex items-center gap-3 md:ml-auto">
            <button
              onClick={handlePinNote}
              title="Pin this note"
              type="button"
              className="text-zinc-600 hover:text-zinc-400 transition-all"
            >
              <Pin
                size={20}
                className={cn(foundNote?.isPinned ? "text-yellow-600" : "text-zinc-600")}
              />
            </button>

            <button
              title="Toggle theme"
              type="button"
              className="text-zinc-600 hover:text-zinc-400 transition-all"
            >
              <Sun size={20} />
            </button>
            <button
              title="Log out"
              type="button"
              className="text-zinc-600 hover:text-zinc-400 transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
        <EditContent />
      </section>
    </main>
  )
}
