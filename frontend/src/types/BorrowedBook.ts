import type { Book } from '../types/Book';

export interface BorrowedBook {
    id: number;
    firstname: string;
    lastname: string;
    dateTake: string;
    dateReturn: string | null;
    book: Book;
  }