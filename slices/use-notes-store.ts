import { create } from "zustand"

type Store = {
  noteId: number
  setNoteId: (id: number) => void
}

export const useNotesStore = create<Store>()((set) => ({
  noteId: 1,
  setNoteId: (id: number) => set((state) => ({ noteId: id })),
}))
