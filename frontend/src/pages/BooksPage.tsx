import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';
import BorrowForm from '../components/BorrowForm';
import { useNavigate } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Typography
} from '@mui/material';

interface Book {
  id_book: number;
  title: string;
  author: string;
  release_date: string;
  quantity: number;
}

const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Greška pri učitavanju knjiga');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Da li si siguran?')) return;

    try {
      await deleteBook(id);
      fetchBooks();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Greška pri brisanju');
    }
  };

  const handleBorrowed = () => {
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
        <Typography variant="h5" sx={{ mb: 2 }}>
        Kolekcija knjiga
      </Typography>

      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Naslov</b></TableCell>
            <TableCell><b>Autor</b></TableCell>
            <TableCell><b>Datum izdavanja</b></TableCell>
            <TableCell><b>Kolicina</b></TableCell>
            <TableCell><b>Akcije</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {books.map((b) => (
            <TableRow key={b.id_book}>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author}</TableCell>
              <TableCell>{b.release_date}</TableCell>
              <TableCell>{b.quantity}</TableCell>
              <TableCell>
              <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                  onClick={() => setSelectedBook(b.id_book)}
                >
                  Borrow
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(b.id_book)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {selectedBook && (
          <BorrowForm
            bookId={selectedBook}
            onClose={() => setSelectedBook(null)}
            onBorrowed={handleBorrowed}
          />
        )}
      </Table>
    </TableContainer>
  </div>
  );
};

export default BookPage;