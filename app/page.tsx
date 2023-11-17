import { PanelLeftClose, X, LogOut, Github, PanelLeftOpen } from "lucide-react"

import SidePanel from "@/components/side-panel"
import EditContent from "@/components/edit-content"

export default function Home() {
  return (
    <main className="flex">
      <SidePanel className="hidden md:block top-0 w-[400px] shrink-0 sticky bg-zinc-800/25 p-4 h-screen" />
      <SidePanel className="h-full md:hidden" />

      <section className="p-4 py-16 grow w-full">
        <div className="mb-12 flex items-center justify-between">
          <button type="button" className="md:opacity-0 md:pointer-events-none">
            <PanelLeftOpen size={20} />
          </button>
          <div className="flex items-center gap-2">
            Swetch
            <span className="text-sm font-medium text-zinc-400">Markdown</span>
          </div>
        </div>
        <EditContent />
      </section>
    </main>
  )
}
