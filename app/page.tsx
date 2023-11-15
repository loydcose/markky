import DynamicTextarea from "@/components/dynamic-textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { PanelLeftClose, X, LogOut, Github, PanelLeftOpen } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import SidePanel from "@/components/side-panel"
import EditContent from "@/components/edit-content"

export default function Home() {
  return (
    <Sheet>
      <main className="flex">
        <SidePanel className="hidden md:block top-0 w-[400px] shrink-0 sticky bg-zinc-800/25 p-4 h-screen"/>

        <SheetContent side={"left"}>
          <SidePanel className="h-full"/>
        </SheetContent>

        <section className="p-4 py-16 grow w-full">
          <div className="mb-12 flex items-center justify-between">
            <SheetTrigger>
              <Button
                variant={"outline"}
                className="md:opacity-0 md:pointer-events-none"
              >
                <PanelLeftOpen size={20} />
              </Button>
            </SheetTrigger>
            <div className="flex items-center gap-2">
              <Switch />
              <span className="text-sm font-medium text-zinc-400">
                Markdown
              </span>
            </div>
          </div>
          <EditContent/>
        </section>
      </main>
    </Sheet>
  )
}
