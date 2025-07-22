import { create } from "zustand";

type Store = {
  user: User | null;
  setUser: (user: User) => void;
  selectedNote: Note | null;
  setSelectedNote: (note: Note) => void;
  userNotes: Note[];
  setUserNotes: (notes: Note[]) => void;
};

export const useNotesStore = create<Store>()((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ user })),

  selectedNote: null,
  setSelectedNote: (note) => set((state) => ({ selectedNote: note })),

  userNotes: [],
  setUserNotes: (notes) => set((state) => ({ userNotes: notes })),
}));
