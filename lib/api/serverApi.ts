import { User } from '@/types/user';
import { nextServer } from './api';
import { CheckSessionRequest } from '@/types/servers';
import { cookies } from 'next/headers';
import { fetchNotesProps, Note, NotesHttpResponse } from '@/types/note';

export const fetchServerNotes = async ({
  page,
  perPage = 12,
  searchQuery,
  tag,
}: fetchNotesProps): Promise<NotesHttpResponse> => {
  const cookieStore = await cookies();
  try {
    const { data } = await nextServer.get<NotesHttpResponse>('/notes', {
      params: {
        page,
        perPage,
        ...(tag && { tag }),
        ...(searchQuery !== '' && { search: searchQuery }),
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return data;
  } catch {
    throw new Error('Unable to retrieve notes. Please try again later.');
  }
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionRequest>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
