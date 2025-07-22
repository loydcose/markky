import { create } from "zustand";

interface NoteTitleState {
  titles: Record<string, string>;
  setTitles: (editors: Editor[]) => void;
  updateTitle: (id: string, title: string) => void;
}

export const useNoteTitleStore = create<NoteTitleState>((set) => ({
  titles: {},
  setTitles: (editors) =>
    set({
      titles: editors.reduce((acc, editor) => {
        acc[editor._id] = editor.title;
        return acc;
      }, {} as Record<string, string>),
    }),
  updateTitle: (id, title) =>
    set((state) => ({
      titles: { ...state.titles, [id]: title },
    })),
}));
