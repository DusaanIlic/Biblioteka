import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';
import BorrowForm from './BorrowForm';
import { useNavigate } from 'react-router-dom';

interface Book {
  id_book: number;
  title: string;
  author: string;
  release_date: string;
  quantity: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowBookId, setBorrowBookId] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    await deleteBook(id);
    fetchBooks();
  };

  // Kada neko pozajmi knjigu, quantity se smanjuje lokalno
  const handleBorrowed = (id: number) => {
    setBooks(prev =>
      prev.map(b => (b.id_book === id ? { ...b, quantity: b.quantity - 1 } : b))
    );
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="book-list-container">
      <h2>Books List</h2>
      <button
        className="borrowed-btn"
        onClick={() => navigate('/borrowed')}
      >
        View Borrowed Books
      </button>

      <table className="book-table">
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
                <button
                  className="borrow-btn"
                  onClick={() => setBorrowBookId(b.id_book)}
                  disabled={b.quantity <= 0}
                >
                  Borrow
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(b.id_book)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {borrowBookId !== null && (
        <BorrowForm
          bookId={borrowBookId}
          onClose={() => setBorrowBookId(null)}
          onBorrowed={handleBorrowed}
        />
      )}
    </div>
  );
};

export default BookList;