import { create } from "zustand";

interface CreateNewEditor {
  deletedEditorId: string | null;
  setIsShowing: (value: string | null) => void;
}

export const useCreateNewEditor = create<CreateNewEditor>((set) => ({
  deletedEditorId: null,

  setIsShowing: (value) => {
    set({ deletedEditorId: value });
  },
}));
