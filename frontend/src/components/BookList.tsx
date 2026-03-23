import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';

interface Book {
  id_book: number;
  title: string;
  author: string;
  release_date: string;
  quantity: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    await deleteBook(id);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books List</h2>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Release Date</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.id_book}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.release_date}</td>
              <td>{b.quantity}</td>
              <td>
                <button onClick={() => handleDelete(b.id_book)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;