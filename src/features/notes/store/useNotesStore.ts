import { message as antdMessage } from 'antd';
import { create } from 'zustand';
import { createNote, fetchNotes, type NoteItem, removeNote } from '../../../shared/api/notesApi';

interface NotesState {
  notes: NoteItem[];
  loading: boolean;
  creating: boolean;
  deletingIds: number[];
  initialized: boolean;
  initNotes: () => Promise<void>;
  refreshNotes: () => Promise<void>;
  createNoteRecord: (text: string) => Promise<void>;
  deleteNoteRecord: (id: number) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  loading: false,
  creating: false,
  deletingIds: [],
  initialized: false,

  initNotes: async () => {
    if (get().initialized) {
      return;
    }

    await get().refreshNotes();
    set({ initialized: true });
  },

  refreshNotes: async () => {
    set({ loading: true });
    try {
      const items = await fetchNotes();
      set({ notes: items });
    } catch {
      antdMessage.error('Не удалось загрузить таблицу');
    } finally {
      set({ loading: false });
    }
  },

  createNoteRecord: async (text: string) => {
    set({ creating: true });
    try {
      await createNote({ text: text.trim() });
      antdMessage.success('Запись добавлена');
      await get().refreshNotes();
    } catch {
      antdMessage.error('Не удалось добавить запись');
      throw new Error('create_note_failed');
    } finally {
      set({ creating: false });
    }
  },

  deleteNoteRecord: async (id: number) => {
    set((state) => ({ deletingIds: [...state.deletingIds, id] }));
    try {
      await removeNote(id);
      antdMessage.success('Запись удалена');
      await get().refreshNotes();
    } catch {
      antdMessage.error('Не удалось удалить запись');
    } finally {
      set((state) => ({ deletingIds: state.deletingIds.filter((value) => value !== id) }));
    }
  },
}));
