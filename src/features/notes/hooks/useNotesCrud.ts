import { useEffect } from 'react';
import { useNotesStore } from '../store/useNotesStore';

export function useNotesCrud() {
  const notes = useNotesStore((state) => state.notes);
  const loading = useNotesStore((state) => state.loading);
  const creating = useNotesStore((state) => state.creating);
  const deletingIds = useNotesStore((state) => state.deletingIds);
  const initNotes = useNotesStore((state) => state.initNotes);
  const refreshNotes = useNotesStore((state) => state.refreshNotes);
  const createNoteRecord = useNotesStore((state) => state.createNoteRecord);
  const deleteNoteRecord = useNotesStore((state) => state.deleteNoteRecord);

  useEffect(() => {
    void initNotes();
  }, [initNotes]);

  return {
    notes,
    loading,
    creating,
    deletingIds,
    refreshNotes,
    createNoteRecord,
    deleteNoteRecord,
  };
}
