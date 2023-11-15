import DynamicTextarea from "@/components/dynamic-textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { PanelLeftClose, X, LogOut, Github } from "lucide-react"

export default function Home() {
  return (
    <main className="flex">
      <aside className="p-4  h-screen sticky bg-zinc-800/25 top-0 w-[400px] shrink-0 flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <h1 className="font-bold">Markky</h1>
          <Button variant={"outline"}>
            <PanelLeftClose size={20} />
          </Button>
        </div>
        <Button variant={"default"} className="w-full mb-10">
          Create new
        </Button>

        <h2 className="mb-2">Notes</h2>
        <div className="flex flex-col gap-2 mb-10">
          <Button
            variant={"outline"}
            className="flex items-center justify-between gap-2 group"
          >
            <p>Hello world!</p>
            <Button
              variant={"ghost"}
              className="opacity-0 group-hover:opacity-100"
            >
              <X size={20} />
            </Button>
          </Button>
          <Button
            variant={"outline"}
            className="flex items-center justify-between gap-2 group"
          >
            <p>Hello world!</p>
            <Button
              variant={"ghost"}
              className="opacity-0 group-hover:opacity-100"
            >
              <X size={20} />
            </Button>
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2 mb-4 mt-auto">
          <div className="flex items-center gap-2">
            <span className="h-[30px] aspect-square rounded-full bg-zinc-700"></span>
            <h3 className="font-bold">Loyd Cose</h3>
          </div>
          <Button variant={"outline"}>
            <LogOut size={20} />
          </Button>
        </div>
        <footer className="border-t border-t-zinc-800 flex items-center gap-2 justify-between py-2">
          <p className="text-sm">All rights reserved</p>
          <Button variant={"ghost"}>
            <Github size={20} />
          </Button>
        </footer>
      </aside>

      <section className="p-4 py-16 grow w-full">
        <div className="flex items-center gap-2 w-fit ml-auto mb-12">
          <Switch />
          <span className="text-sm font-medium text-zinc-400">Markdown</span>
        </div>
        <DynamicTextarea defaultValue={"Hello world!"} placeholder="Type your notes"/>
      </section>
    </main>
  )
}
