import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8081', // tvoj backend port
});

// Book API
export const getBooks = () => API.post('/Book/search', {}); // prazna pretraga vraća sve
export const getBookById = (id: number) => API.get(`/Book/${id}`);
export const addBook = (book: any) => API.post('/Book/insert', book);
export const updateBook = (id: number, book: any) => API.put(`/Book/${id}`, book);
export const deleteBook = (id: number) => API.delete(`/Book/${id}`);

// Search
export const searchBooks = (payload: { title?: string; author?: string }) =>
  API.post('/Book/search', payload);