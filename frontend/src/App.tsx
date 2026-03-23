import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import BookList from './components/BookList';
import BorrowedBooksPage from './pages/BorrowedBooksPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/borrowed" element={<BorrowedBooksPage />} />
      </Routes>
    </Router>
  );
}

export default App;