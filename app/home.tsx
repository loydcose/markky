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
  LogIn,
} from "lucide-react"
import { signIn, signOut } from "next-auth/react"
import SidePanel from "@/components/side-panel"
import EditContent from "@/components/edit-content"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useNotesStore } from "@/slices/use-notes-store"
import { notes } from "@/data"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { getUserNotes, updateNote } from "@/actions"

type HomeProps = {
  initUser: User
  initUserNotes: Note[]
}

export default function Home({ initUser, initUserNotes }: HomeProps) {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const {
    selectedNote,
    setUserNotes,
    setUser,
    user,
    userNotes,
    setSelectedNote,
  } = useNotesStore()

  useEffect(() => {
    setUserNotes(initUserNotes)
    setUser(initUser)
  }, [])

  const handlePinNote = async () => {
    if (!selectedNote) return

    try {
      await updateNote(selectedNote._id, { isPinned: !selectedNote.isPinned })

      // refresh fetch? that's a bad idea literally. But let's try
      const userNotesRes = await getUserNotes(user?._id || "")
      setUserNotes(userNotesRes)
      setSelectedNote(
        userNotesRes.find((note) => selectedNote._id === note._id)
      )
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <>
      <nav className="flex items-center justify-between p-8 md:p-16">
        <div className="relative flex items-center gap-3">
          <button
            type="button"
            className="text-zinc-600 hover:text-zinc-400 transition-all"
            onClick={() => setIsSidePanelOpen((prev) => !prev)}
          >
            {isSidePanelOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="font-bold text-zinc-300">Markky</h1>
          <SidePanel
            className={cn(
              "top-[calc(100%+20px)] w-[300px] left-0 absolute bg-zinc-900 z-10",
              isSidePanelOpen ? "flex" : "hidden"
            )}
          />
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
              className={cn(
                selectedNote?.isPinned ? "text-yellow-600" : "text-zinc-600"
              )}
            />
          </button>

          <button
            title="Toggle theme"
            type="button"
            className="text-zinc-600 hover:text-zinc-400 transition-all"
          >
            <Sun size={20} />
          </button>

          {user ? (
            <button
              onClick={() => signOut()}
              title="Log out"
              type="button"
              className="text-zinc-600 hover:text-zinc-400 transition-all"
            >
              <LogOut size={20} />
            </button>
          ) : (
            <Link
              title="Log in"
              href="/auth"
              className="text-zinc-600 hover:text-zinc-400 transition-all"
            >
              <LogIn size={20} />
            </Link>
          )}
        </div>
      </nav>
      <main className="relative">
        <section className="p-8 md:p-16 grow w-full">
          <EditContent />
        </section>
      </main>
    </>
  )
}
