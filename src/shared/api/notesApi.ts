import { axiosInstance } from './axiosClient';

export interface NoteItem {
  id: number;
  text: string;
  created_at: string;
}

interface NotesListResponse {
  items: NoteItem[];
}

export async function fetchNotes(): Promise<NoteItem[]> {
  const response = await axiosInstance.get<NotesListResponse>('/notes');
  return response.data.items;
}

export async function createNote(payload: { text: string }): Promise<NoteItem> {
  const response = await axiosInstance.post<NoteItem>('/notes', payload);
  return response.data;
}

export async function removeNote(noteId: number): Promise<void> {
  await axiosInstance.delete(`/notes/${noteId}`);
}
