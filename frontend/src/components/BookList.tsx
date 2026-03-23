import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook, borrowBook } from '../services/api';


interface Book {
  id_book: number;
  title: string;
  author: string;
  release_date: string;
  quantity: number;
  status: 'free' |'borrowed';
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const availableBooks = books.filter(b => b.status === 'free');

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

  const handleBorrow = async (bookId: number) => {
    const firstname = prompt("Enter first name");
    const lastname = prompt("Enter last name");
    if (!firstname || !lastname) return;
  
    // format YYYY-MM-DD
    const today = new Date();
    const date_take = today.toISOString().split('T')[0];
  
    const payload = {
      firstname,
      lastname,
      date_take,
      date_return: null, // knjiga tek pozajmljena
      id_book: bookId
    };
  
    try {
      await borrowBook(payload);
      fetchBooks();
      alert("Book borrowed successfully!");
    } catch (err) {
      console.error("Error borrowing book:", err);
      alert("Failed to borrow book");
    }
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
                <button onClick={() => handleBorrow(b.id_book)}>Borrow</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;