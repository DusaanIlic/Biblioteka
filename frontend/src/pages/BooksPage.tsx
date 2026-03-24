import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';
import BorrowForm from '../components/BorrowForm';

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
      <Typography variant="h4" 
        sx={{
          fontWeight: 'bold',
          mb: 3,
          color: '#1e293b'
        }}>
        Kolekcija knjiga
      </Typography>

      <TableContainer component={Paper} sx={{
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        overflow: 'hidden'
      }}>
      <Table>
        <TableHead>
          <TableRow sx={{background: 'linear-gradient(90deg, #1976d2, #42a5f5)'}}>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Naslov</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Autor</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Datum izdavanja</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Količina</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Akcije</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {books.map((b) => (
            <TableRow key={b.id_book} sx={{'&:hover': {backgroundColor: '#f1f5f9',transition: '0.2s'}}}>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author}</TableCell>
              <TableCell>{b.release_date}</TableCell>
              <TableCell>{b.quantity}</TableCell>
              <TableCell>
              <Button
                  variant="contained"
                  sx={{
                    mr: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #1565c0, #1e88e5)'
                    }
                  }}
                  onClick={() => setSelectedBook(b.id_book)}
                >
                  Pozajmi
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #d32f2f, #ef5350)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #c62828, #e53935)'
                    }
                  }}
                  onClick={() => handleDelete(b.id_book)}
                >
                  Obriši
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