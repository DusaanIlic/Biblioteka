import React, { useState } from 'react';
import { addBook } from '../services/api';

const BookForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [release_date, setReleaseDate] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook({ title, author, release_date, quantity });
    onSuccess();
    setTitle('');
    setAuthor('');
    setReleaseDate('');
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" />
      <input value={release_date} onChange={e => setReleaseDate(e.target.value)} placeholder="Release Date" />
      <input type="number" value={quantity} onChange={e => setQuantity(+e.target.value)} min={1} />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;