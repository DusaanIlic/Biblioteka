import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import { Container, Typography } from '@mui/material';
import BorrowedBooksPage from './pages/BorrowedBooksPage';

function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ my: 3 }}>
          📚 Biblioteka
        </Typography>

        <Routes>
          <Route path="/borrowed" element={<BorrowedBooksPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/" element={<BooksPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;