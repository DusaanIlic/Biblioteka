import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';
import BorrowForm from '../components/BorrowForm';
import type { Book } from '../types/Book';
import AddBookForm from '../components/AddBookForm';

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
  Typography,
  TablePagination,
  TextField,
  Box
} from '@mui/material';



const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [openAdd, setOpenAdd] = useState(false);

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

  const filteredBooks = books.filter((b) => {
    const matchesTitle = b.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase());
  
    const matchesAuthor = (b.author || '')
      .toLowerCase()
      .includes(searchAuthor.toLowerCase());
  
    return matchesTitle && matchesAuthor;
  });

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
        Колекција књига
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField
          label="Претражи по називу књиге..."
          variant="outlined"
          value={searchTitle}
          fullWidth
          onChange={(e) => {
            setSearchTitle(e.target.value);
            setPage(0);
          }}
        />

        <TextField
          label="Претражи по имену аутора..."
          variant="outlined"
          value={searchAuthor}
          fullWidth
          onChange={(e) => {
            setSearchAuthor(e.target.value);
            setPage(0);
          }}
        />

        <Button
              variant="contained"
              color="success"
              onClick={() => setOpenAdd(true)}
              sx={{ ml: 'auto', fontWeight: 'bold' }}
            >
              Додај књигу
        </Button>
      </Box>  



      <TableContainer component={Paper} sx={{
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        //maxHeight: '75vh',
        //overflow: 'auto'
        overflow: 'hidden'
      }}>
      <Table> 
        <TableHead>
          <TableRow sx={{background: 'linear-gradient(90deg, #1976d2, #42a5f5)'}}>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Наслов</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Аутор</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Редни број</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Количина</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Aкције</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((b) => (
            <TableRow key={b.id_book} sx={{'&:hover': {backgroundColor: '#f1f5f9',transition: '0.2s'}}}>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author && b.author.toLowerCase() !== 'unknown' ? b.author : 'Непознати аутор'}</TableCell>
              <TableCell>{b.serial_number}</TableCell>
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
                  Позајми
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
                  Обриши
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
      {openAdd && (
  <AddBookForm
    onClose={() => setOpenAdd(false)}
    onAdded={fetchBooks}
  />
)}
      <TablePagination
          component="div"
          count={filteredBooks.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 50]}
      />
    </TableContainer>
  </div>
  );
};

export default BookPage;