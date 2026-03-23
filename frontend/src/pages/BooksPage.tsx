import React from 'react';
import BookList from '../components/BookList';

const BooksPage: React.FC = () => {
  return (
    <div>
      <h1>Books Page</h1>
      <BookList />
    </div>
  );
};

export default BooksPage;