"use client";

import { useState } from "react";
import { SidebarPanel } from "./SidebarPanel";
import { NoteEditor } from "./NoteEditor";

export default function Sample() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [noteTitle, setNoteTitle] = useState("Hellow orld!");
  const [editorContent, setEditorContent] = useState("");

  // Mock data for notes
  const favoriteNotes = [
    { id: 1, title: "Important Meeting Notes" },
    { id: 2, title: "Project Ideas" },
  ];

  const regularNotes = [
    { id: 3, title: "Shopping List" },
    { id: 4, title: "Book Recommendations" },
    { id: 5, title: "Travel Plans" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <SidebarPanel
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        favoriteNotes={favoriteNotes}
        regularNotes={regularNotes}
      />
      {/* Main Editor */}
      <NoteEditor
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle}
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />
    </div>
  );
}
