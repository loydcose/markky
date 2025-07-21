"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Plus, LogOut, User } from "lucide-react";
import { NoteItem } from "./NoteItem";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createEditor } from "@/actions";

type SidebarPanelProps = {
  user: any;
  favoriteNotes: Editor[];
  regularNotes: Editor[];
};

export function SidebarPanel({
  user,
  favoriteNotes,
  regularNotes,
}: SidebarPanelProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    const res = await createEditor(user._id);
    console.log(res.slug);
    router.push("/sample/" + res.slug);
  };


  return (
    <div
      className={`relative transition-all duration-300 ${
        sidebarCollapsed ? "w-12" : "w-80"
      } border-r border-gray-200 bg-white`}
    >
      {/* Collapse Toggle */}
      <Button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        size="sm"
        variant="ghost"
        className="absolute -right-3 top-4 z-10 h-6 w-6 rounded-full border border-gray-300 bg-white p-0 hover:bg-gray-100"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {!sidebarCollapsed && (
        <div className="flex flex-col h-full p-4 overflow-y-auto">
          {/* User Section */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <span className="font-medium">{user.name}</span>
          </div>

          {/* Favorites Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-3">
              Favorites
            </h3>
            {favoriteNotes.length === 0 ? (
              <p className="text-xs text-zinc-400">
                Favorite notes will go here.
              </p>
            ) : (
              <div className="space-y-2">
                {favoriteNotes.map((note) => (
                  <NoteItem key={note._id} note={note} isFavorite={true} user={user} />
                ))}
              </div>
            )}
          </div>

          <Separator className="bg-gray-200 mb-6" />

          {/* Notes Section */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Notes</h3>
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {regularNotes.map((note) => (
                  <NoteItem key={note._id} note={note} user={user}/>
                ))}
              </div>
              <div className="mt-4">
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white" onClick={handleClick}>
                  <Plus className="h-4 w-4 mr-2" />
                  New
                </Button>
              </div>
            </ScrollArea>
          </div>

          {/* Logout Button */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}

      {sidebarCollapsed && (
        <div className="flex flex-col items-center py-4 space-y-4">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Plus className="h-4 w-4" />
          </Button>
          <div className="flex-1" />
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
