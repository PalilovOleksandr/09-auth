import { userRequest, User, EditUser } from '@/types/user';
import { nextServer } from './api';
import {
  CreateNote,
  fetchNotesProps,
  Note,
  NotesHttpResponse,
} from '@/types/note';
import { CheckSessionRequest } from '@/types/servers';

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

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const { data } = await nextServer.get<Note>(`/notes/${id}`);
    return data;
  } catch {
    throw new Error('Unable to retrieve note. It might not exist.');
  }
};

export const signUp = async (dataUser: userRequest): Promise<User> => {
  try {
    const { data } = await nextServer.post<User>('/auth/register', dataUser);
    return data;
  } catch {
    throw new Error('Unable to register user. Please try again.');
  }
};

export const signIn = async (dataUser: userRequest): Promise<User> => {
  try {
    const { data } = await nextServer.post<User>('/auth/login', dataUser);
    return data;
  } catch {
    throw new Error('Unable to login user. Please try again.');
  }
};
export const checkSession = async (): Promise<boolean> => {
  const { data } = await nextServer.get<CheckSessionRequest>('/auth/session');
  return data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const updateMe = async (payload: EditUser): Promise<User> => {
  const { data } = await nextServer.patch<User>('/users/me', payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};
