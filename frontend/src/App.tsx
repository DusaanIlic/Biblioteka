import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import BookList from './components/BookList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books" element={<BooksPage />} />
      </Routes>
    </Router>
  );
}

export default App;