import React, { useState } from 'react';
import { borrowBook } from '../services/api';
import '../styles/BorrowForm.css';

interface Props {
  bookId: number;
  onClose: () => void;
  onBorrowed: (id: number) => void;
}

const BorrowForm: React.FC<Props> = ({ bookId, onClose, onBorrowed }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await borrowBook({
        id_book: bookId,
        firstname,
        lastname,
        date_take: new Date().toISOString(),
        date_return: null
      });
      onBorrowed(bookId); // smanji quantity u BookList
      onClose();
    } catch (err) {
      console.error('Error borrowing book:', err);
    }
  };

  return (
    <div className="borrow-form-overlay">
      <div className="borrow-form">
        <h3>Borrow Book</h3>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={lastname}
              onChange={e => setLastname(e.target.value)}
              required
            />
          </label>
          <div className="buttons">
            <button type="submit">Borrow</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowForm;