import { create } from "zustand";

interface EditorStore {
  editors: Editor[];
  setEditors: (editors: Editor[]) => void;
  renameEditor: (id: string, title: string) => void;
  favoriteEditor: (id: string, pinned: boolean) => void;
  deleteEditor: (id: string) => void;
  createNewEditor: (editor: Editor) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  editors: [],

  setEditors: (editors) => {
    set({ editors });
  },

  renameEditor: (id, title) => {
    set((state) => ({
      editors: state.editors.map((editor) =>
        editor._id === id ? { ...editor, title } : editor
      ),
    }));
  },

  favoriteEditor: (id, pinned) => {
    set((state) => ({
      editors: state.editors.map((editor) =>
        editor._id === id ? { ...editor, isPinned: pinned } : editor
      ),
    }));
  },

  deleteEditor: (id) => {
    set((state) => ({
      editors: state.editors.filter((editor) => editor._id !== id),
    }));
  },

  createNewEditor: (newEditor) => {
    set((state) => ({
      editors: [newEditor, ...state.editors],
    }));
  },
}));
