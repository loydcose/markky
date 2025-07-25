"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  LogOut,
  User,
  Menu,
  MoreVertical,
  PanelLeftOpen,
  PanelLeftClose,
  Star,
  FileText,
} from "lucide-react";
import { NoteItem } from "./NoteItem";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createEditor } from "@/actions";
import { useEditorStore } from "@/slices/editors-store";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "react-responsive";
import { useDebounce } from "@/hooks/use-debounce";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signOut } from "next-auth/react";

type SidebarPanelProps = {
  user: any;
};

export function SidebarPanel({ user }: SidebarPanelProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { editors } = useEditorStore();
  const router = useRouter();
  const favorites = editors.filter((x) => x.isPinned);
  const notesCount = editors.length;
  const favoritesCount = favorites.length;
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Editor[]>([]);
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    console.log({ session });
  }, [session]);

  useEffect(() => {
    if (isSmallScreen) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  }, [isSmallScreen]);

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== "") {
      setIsSearching(true);
      const lower = debouncedSearchTerm.toLowerCase();
      setSearchResults(
        editors.filter(
          (editor) =>
            editor.title.toLowerCase().includes(lower) ||
            (typeof editor.title === "string"
              ? editor.title.toLowerCase().includes(lower)
              : JSON.stringify(editor.title).toLowerCase().includes(lower))
        )
      );
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [debouncedSearchTerm, editors]);

  const handleClick = async () => {
    const res = await createEditor(user._id);
    router.push("/editors/" + res.slug + "?new=true");
  };

  return (
    <div
      className={`relative transition-all duration-300 ${
        sidebarCollapsed ? "w-12" : "min-w-72 w-72"
      }  border-r border-gray-200 bg-white flex flex-col h-screen `}
    >
      {/* Collapse Toggle */}
      <Button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        size="sm"
        variant="ghost"
        className="absolute -right-3 top-[24px] z-10 h-6 w-6 rounded-full border border-gray-300 bg-white p-0 hover:bg-gray-100"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {!sidebarCollapsed && (
        <div className="flex flex-col h-full text-xs">
          {/* User Section with Dropdown */}
          <div className="flex items-center gap-2 relative px-2 py-2">
            <div className="h-7 w-7 shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
              {session?.user?.image ? (
                <div className="size-7 overflow-hidden rounded-full">
                  <Image
                    src={session.user.image}
                    alt={session.user?.name ?? "User"}
                    className="size-full object-cover"
                    width={200}
                    height={200}
                  />
                </div>
              ) : (
                <User className="h-3 w-3 text-gray-600" />
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-medium truncate text-xs">{user.name}</span>
              <span className="text-[10px] text-gray-400 truncate">
                Personal Workspace
              </span>
            </div>
            <Button
              type="button"
              variant={"ghost"}
              size={"icon"}
              className="flex items-center size-7 rounded-md text-xs text-zinc-400 hover:text-red-600 hover:bg-zinc-50"
              onClick={handleLogout}
            >
              <LogOut className="h-3 w-3 m-auto" />
            </Button>
            {/* <Button type="button" variant={"ghost"} size={"icon"}>
              <PanelLeftClose />
            </Button> */}
          </div>

          {/* Search Bar */}
          <div className="mb-2 px-2">
            <Input
              placeholder="Search notes..."
              className="w-full text-xs h-7 px-2 py-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => setSearchTerm("")}
            />
          </div>

          <Separator className="bg-gray-200" />

          {/* Main scrollable content: Favorites + Notes */}
          <div className="flex flex-col flex-1 min-h-0">
            {isSearching ? (
              <div className="flex-1 flex flex-col px-2 pt-2 min-h-0">
                <div className="flex items-center mb-2 gap-1">
                  <FileText size={12} />
                  <span className="font-medium text-gray-600 text-xs">
                    Search Results
                  </span>
                  <span className="text-[10px] bg-gray-100 text-gray-600 rounded-full px-1.5 py-0.5">
                    {searchResults.length}
                  </span>
                </div>
                <ScrollArea className="flex-1 min-h-0 overflow-y-auto">
                  <div className="space-y-1">
                    {searchResults.length === 0 ? (
                      <p className="text-[10px] text-zinc-400">
                        No results found.
                      </p>
                    ) : (
                      searchResults.map((note) => (
                        <NoteItem key={note._id} note={note} user={user} />
                      ))
                    )}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            ) : (
              <>
                {/* Favorites Section */}
                <div
                  className="mb-2 px-2 pt-2 flex flex-col min-h-0"
                  style={{ flexBasis: "40%", flexShrink: 0, minHeight: 0 }}
                >
                  <div className="flex items-center mb-2 gap-1">
                    <Star size={12} />
                    <span className="font-medium text-gray-600 text-xs">
                      Favorites
                    </span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 rounded-full px-1.5 py-0.5">
                      {favoritesCount}
                    </span>
                  </div>
                  {favoritesCount === 0 ? (
                    <p className="text-[10px] text-zinc-400">
                      Favorite notes will go here.
                    </p>
                  ) : (
                    <ScrollArea className="flex-1 min-h-0 max-h-full overflow-y-auto">
                      <div className="space-y-1">
                        {favorites.map((note) => (
                          <NoteItem
                            key={note._id}
                            note={note}
                            isFavorite={true}
                            user={user}
                          />
                        ))}
                      </div>
                      <ScrollBar orientation="vertical" />
                    </ScrollArea>
                  )}
                </div>

                <Separator className="bg-gray-200" />

                {/* Notes Section */}
                <div
                  className="flex-1 flex flex-col px-2 pt-2 min-h-0"
                  style={{ flex: "1 1 60%", minHeight: 0 }}
                >
                  <div className="flex items-center mb-2 gap-1">
                    <FileText size={12} />
                    <span className="font-medium text-gray-600 text-xs">
                      Notes
                    </span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 rounded-full px-1.5 py-0.5">
                      {notesCount}
                    </span>
                  </div>
                  <ScrollArea className="flex-1 min-h-0 overflow-y-auto">
                    <div className="space-y-1">
                      {editors.map((note) => (
                        <NoteItem key={note._id} note={note} user={user} />
                      ))}
                    </div>
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                </div>
              </>
            )}
          </div>

          {/* New Note Button at Bottom */}
          <div className="mt-2 px-2 pb-2">
            <Button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white text-xs h-7"
              onClick={handleClick}
            >
              <Plus className="h-3 w-3 mr-1" />
              New Note
            </Button>
          </div>
        </div>
      )}

      {sidebarCollapsed && (
        <div className="flex flex-col items-center py-2 space-y-2 h-full">
          <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-3 w-3 text-gray-600" />
          </div>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={handleClick}>
            <Plus className="h-3 w-3" />
          </Button>
          <div className="flex-1" />
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0"
            onClick={handleLogout}
          >
            <LogOut className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
