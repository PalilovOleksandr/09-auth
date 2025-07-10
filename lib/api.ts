import axios from 'axios';
import {
  NotesHttpResponse,
  registerRequest,
  User,
  type CreateNote,
  type Note,
} from '../types/note';

const myKey = process.env.NEXT_PUBLIC_API_URL;
if (!myKey) {
  throw new Error(
    'Environment variable NEXT_PUBLIC_API_URL is not defined. Please ensure it is set.'
  );
}

const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: { Authorization: `Bearer ${myKey}` },
});

interface fetchNotesProps {
  page: number;
  perPage?: number;
  searchQuery?: string;
  tag?: string;
}

export const fetchNotes = async ({
  page,
  perPage = 12,
  searchQuery,
  tag,
}: fetchNotesProps): Promise<NotesHttpResponse> => {
  try {
    const { data } = await nextServer.get<NotesHttpResponse>('/notes', {
      params: {
        page,
        perPage,
        ...(tag && { tag }),
        ...(searchQuery !== '' && { search: searchQuery }),
      },
    });
    return data;
  } catch {
    throw new Error('Unable to retrieve notes. Please try again later.');
  }
};

export const createNote = async (noteData: CreateNote): Promise<Note> => {
  try {
    const { data } = await nextServer.post<Note>('/notes', noteData);
    return data;
  } catch {
    throw new Error(
      'Unable to create note. Please check your data and try again.'
    );
  }
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  try {
    const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
    return data;
  } catch {
    throw new Error(
      'Unable to delete note. It might have already been removed.'
    );
  }
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  try {
    const { data } = await nextServer.get<Note>(`/notes/${id}`);
    return data;
  } catch {
    throw new Error('Unable to retrieve note. It might not exist.');
  }
};

export const register = async (dataUser: registerRequest): Promise<User> => {
  try {
    const { data } = await nextServer.post<User>('/auth/register', dataUser);
    return data;
  } catch {
    throw new Error('Unable to register user. Please try again.');
  }
};
