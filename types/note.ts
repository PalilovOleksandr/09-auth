export type Tags =
  | 'Work'
  | 'Personal'
  | 'Meeting'
  | 'Shopping'
  | 'Ideas'
  | 'Travel'
  | 'Finance'
  | 'Health'
  | 'Important'
  | 'Todo';

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tags;
}

export interface CreateNote {
  title: string;
  content?: string;
  tag: Tags;
}

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number | undefined;
}

export interface TagsProps {
  tags: Tags[];
}

export interface fetchNotesProps {
  page: number;
  perPage?: number;
  searchQuery?: string;
  tag?: string;
}
