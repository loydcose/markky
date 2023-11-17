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

export default function Home() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

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
              title="Pin this note"
              type="button"
              className="text-zinc-600 hover:text-zinc-400 transition-all"
            >
              <Pin size={20} className={cn(true ? "text-yellow-600" : "text-zinc-600")} />
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
